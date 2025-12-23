import { NextResponse, type NextRequest } from "next/server"
import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { eventSchema } from "@/lib/validators/event.schema"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

/* =========================
   GET EVENT BY ID
========================= */
export async function GET(
  _req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params

  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1)

  const event = result[0]

  if (!event) {
    return NextResponse.json(
      { success: false, message: "Event not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: event,
  })
}

/* =========================
   UPDATE EVENT
========================= */
export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params
  const body = await req.json()

  const data = eventSchema.partial().parse(body)

  await db
    .update(events)
    .set({
      ...data,
      startDate: data.startDate
        ? new Date(data.startDate)
        : undefined,
      endDate: data.endDate
        ? new Date(data.endDate)
        : undefined,
      updatedAt: new Date(),
    })
    .where(eq(events.id, id))

  const updated = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1)

  return NextResponse.json({
    success: true,
    data: updated[0],
  })
}

/* =========================
   DELETE EVENT
========================= */
export async function DELETE(
  _req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params

  await db.delete(events).where(eq(events.id, id))

  return NextResponse.json({
    success: true,
    message: "Event deleted successfully",
  })
}

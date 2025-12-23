import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { eventSchema } from "@/lib/validators/event.schema"

type Params = {
  params: Promise<{
    id: string
  }>
}

/* =========================
   GET EVENT BY ID
========================= */
export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  const { id } = await params

  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1)

  if (!result.length) {
    return NextResponse.json(
      { success: false, message: "Event not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: result[0],
  })
}

/* =========================
   UPDATE EVENT
========================= */
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params
    const body = await req.json()
    const data = eventSchema.partial().parse(body)

    await db
      .update(events)
      .set({
        title: data.title,
        description: data.description,
        location: data.location,
        isOnline: data.isOnline,
        coverImageUrl: data.coverImageUrl,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
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
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message ?? "Internal server error" },
      { status: 500 }
    )
  }
}

/* =========================
   DELETE EVENT
========================= */
export async function DELETE(
  _req: NextRequest,
  { params }: Params
) {
  const { id } = await params

  await db.delete(events).where(eq(events.id, id))

  return NextResponse.json({
    success: true,
    message: "Event deleted successfully",
  })
}

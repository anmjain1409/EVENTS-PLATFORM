import { NextResponse } from "next/server"
import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { eventSchema } from "@/lib/validators/event.schema"

type Context = {
  params: Promise<{
    id: string
  }>
}

/* =========================
   GET EVENT BY ID
========================= */
export async function GET(
  _req: Request,
  context: Context
) {
  const { id } = await context.params

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Missing event id" },
      { status: 400 }
    )
  }

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
    data: event
  })
}

/* =========================
   UPDATE EVENT
========================= */
export async function PUT(
  req: Request,
  context: Context
) {
  try {
    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing event id" },
        { status: 400 }
      )
    }

    const body = await req.json()

    // partial() → update me sab fields required nahi
    const data = eventSchema.partial().parse(body)

    await db
      .update(events)
      .set({
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        updatedAt: new Date()
      })
      .where(eq(events.id, id))

    const updated = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1)

    return NextResponse.json({
      success: true,
      data: updated[0]
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message ?? "Internal server error"
      },
      { status: 500 }
    )
  }
}

/* =========================
   DELETE EVENT
========================= */
export async function DELETE(
  _req: Request,
  context: Context
) {
  try {
    const { id } = await context.params

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing event id" },
        { status: 400 }
      )
    }

    await db
      .delete(events)
      .where(eq(events.id, id))

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully"
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}

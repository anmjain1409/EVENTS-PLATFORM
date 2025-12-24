import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { eventSchema } from "@/lib/validators/event.schema"

/**
 * Force this API route to be evaluated at runtime only
 */
export const dynamic = "force-dynamic"

type Params = {
  params: {
    id: string
  }
}

/* =========================
   GET EVENT BY ID
========================= */
export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  try {
    const db = getDb()
    const eventId = params.id

    const result = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId))
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
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch event" },
      { status: 500 }
    )
  }
}

/* =========================
   UPDATE EVENT
========================= */
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const db = getDb()
    const eventId = params.id
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
      .where(eq(events.id, eventId))

    const updated = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId))
      .limit(1)

    return NextResponse.json({
      success: true,
      data: updated[0],
    })
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to update event" },
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
  try {
    const db = getDb()
    const eventId = params.id

    await db.delete(events).where(eq(events.id, eventId))

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete event" },
      { status: 500 }
    )
  }
}

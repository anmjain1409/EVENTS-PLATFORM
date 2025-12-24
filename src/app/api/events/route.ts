import { NextRequest, NextResponse } from "next/server"
import { getAllEvents, createEvent } from "@/lib/services/event.service"
import { eventSchema } from "@/lib/validators/event.schema"

/**
 * IMPORTANT:
 * Ensure this route is evaluated only at runtime (not at build time)
 */
export const dynamic = "force-dynamic"

/* =========================
   GET ALL EVENTS
========================= */
export async function GET() {
  try {
    const events = await getAllEvents()

    return NextResponse.json({
      success: true,
      data: events,
    })
  } catch (error) {
    console.error("GET /api/events error:", error)

    return NextResponse.json(
      { success: false, message: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

/* =========================
   CREATE EVENT
========================= */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = eventSchema.parse(body)

    const event = await createEvent(data)

    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("POST /api/events error:", error)

    return NextResponse.json(
      { success: false, message: "Failed to create event" },
      { status: 400 }
    )
  }
}

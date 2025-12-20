import { NextResponse } from "next/server"
import { createEvent, getAllEvents } from "@/lib/services/event.service"
import { eventSchema } from "@/lib/validators/event.schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = eventSchema.parse(body)

    const event = await createEvent(data)

    return NextResponse.json({
      success: true,
      data: event
    }, { status: 201 })

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message ?? "Internal server error"
    }, { status: 500 })
  }
}

export async function GET() {
  const events = await getAllEvents()
  return NextResponse.json({ success: true, data: events })
}

import { NextResponse } from "next/server"
import { getAllEvents, createEvent } from "@/lib/services/event.service"
import { eventSchema } from "@/lib/validators/event.schema"


export async function GET() {
  try {
    const events = await getAllEvents()
    return NextResponse.json({ success: true, data: events })
  } catch (err: any) {
    console.error("GET /api/events", err)
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = eventSchema.parse(body)
    const event = await createEvent(data)

    return NextResponse.json({ success: true, data: event })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    )
  }
}

import { NextResponse } from "next/server"
import { eventSchema } from "@/lib/validators/event.schema"
import { createEvent } from "@/lib/services/event.service"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = eventSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          errors: parsed.error.flatten()
        },
        { status: 400 }
      )
    }

    const event = await createEvent(parsed.data)

    return NextResponse.json(
      {
        success: true,
        data: event
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("CREATE_EVENT_ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error"
      },
      { status: 500 }
    )
  }
}

import { db } from "@/db"
import { events } from "@/db/schema"
import { EventInput } from "@/lib/validators/event.schema"
import { eq } from "drizzle-orm"

export async function createEvent(data: EventInput) {
  const id = crypto.randomUUID()

  await db.insert(events).values({
    id,
    title: data.title,
    description: data.description,
    location: data.location,
    isOnline: data.isOnline,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    coverImageUrl: data.coverImageUrl
  })

  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, id))

  return event
}

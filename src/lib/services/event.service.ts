import { db } from "@/db"
import { events } from "@/db/schema"
import { EventInput } from "@/lib/validators/event.schema"
import { eq, desc, sql } from "drizzle-orm"

// Create a new event
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

// Get all events
export async function getAllEvents() {
  return await db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt))
}

// Get single event by ID  ✅ FIXED
export async function getEventById(id: string) {
  const result = await db.execute(
    sql`SELECT * FROM events WHERE id = ${id} LIMIT 1`
  )

  return result[0] ?? null
}

// Update an event
export async function updateEvent(
  id: string,
  data: Partial<EventInput>
) {
  await db
    .update(events)
    .set({
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      updatedAt: new Date()
    })
    .where(eq(events.id, id))

  return getEventById(id)
}

// Delete an event
export async function deleteEvent(id: string) {
  await db.delete(events).where(eq(events.id, id))
  return true
}

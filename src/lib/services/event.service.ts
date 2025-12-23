import { db } from "@/db"
import { events } from "@/db/schema"
import { EventInput } from "@/lib/validators/event.schema"
import { eq, desc } from "drizzle-orm"

/* =========================
   CREATE EVENT
========================= */
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
    coverImageUrl: data.coverImageUrl,
  })

  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1)

  return result[0]
}

/* =========================
   GET ALL EVENTS
========================= */
export async function getAllEvents() {
  const result = await db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt))

  return result
}

/* =========================
   GET EVENT BY ID
========================= */
export async function getEventById(id: string) {
  const result = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1)

  return result[0] ?? null
}

/* =========================
   UPDATE EVENT
========================= */
export async function updateEvent(
  id: string,
  data: Partial<EventInput>
) {
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

  return getEventById(id)
}

/* =========================
   DELETE EVENT
========================= */
export async function deleteEvent(id: string) {
  await db.delete(events).where(eq(events.id, id))
  return true
}

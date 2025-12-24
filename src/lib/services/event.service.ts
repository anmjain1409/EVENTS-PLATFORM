import { getDb } from "@/db"
import { events } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { EventInput } from "@/lib/validators/event.schema"

/* =========================
   CREATE EVENT
========================= */
export async function createEvent(data: EventInput) {
  const db = getDb()
  const id = crypto.randomUUID()

  await db.insert(events).values({
    id,
    title: data.title,
    description: data.description,
    location: data.location,
    isOnline: data.isOnline,
    coverImageUrl: data.coverImageUrl,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return getEventById(id)
}

/* =========================
   GET ALL EVENTS
========================= */
export async function getAllEvents() {
  const db = getDb()

  return await db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt))
}

/* =========================
   GET EVENT BY ID
========================= */
export async function getEventById(id: string) {
  const db = getDb()

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
  const db = getDb()

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
  const db = getDb()

  await db.delete(events).where(eq(events.id, id))
  return true
}

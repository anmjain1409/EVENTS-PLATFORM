import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"
import { EventInput } from "@/lib/validators/event.schema"

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
    coverImageUrl: data.coverImageUrl,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
  })

  return getEventById(id)
}

/* =========================
   GET ALL EVENTS
========================= */
export async function getAllEvents() {
  return await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.createdAt)],
  })
}

/* =========================
   GET EVENT BY ID
========================= */
export async function getEventById(id: string) {
  const result = await db.query.events.findFirst({
    where: eq(events.id, id),
  })

  return result ?? null
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

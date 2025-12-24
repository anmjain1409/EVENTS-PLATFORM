// src/lib/api/event.ts

export type EventPayload = {
  title: string
  description: string
  location?: string
  isOnline: boolean
  startDate: string
  endDate?: string
}

/* =========================
   INTERNAL RESPONSE HANDLER
========================= */
async function parseResponse(res: Response) {
  const json = await res.json()

  if (!res.ok) {
    throw new Error(json?.message || "Request failed")
  }

  return json.data
}

/* =========================
   GET ALL EVENTS
========================= */
export async function getEvents() {
  const res = await fetch("/api/events", {
    cache: "no-store",
  })

  return parseResponse(res)
}

/* =========================
   GET EVENT BY ID
========================= */
export async function getEvent(id: string) {
  if (!id) return null

  const res = await fetch(`/api/events/${id}`, {
    cache: "no-store",
  })

  if (res.status === 404) {
    return null
  }

  return parseResponse(res)
}

/* =========================
   CREATE EVENT
========================= */
export async function createEvent(data: EventPayload) {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  })

  return parseResponse(res)
}

/* =========================
   UPDATE EVENT
========================= */
export async function updateEvent(
  id: string,
  data: Partial<EventPayload>
) {
  const res = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  })

  return parseResponse(res)
}

/* =========================
   DELETE EVENT
========================= */
export async function deleteEvent(id: string) {
  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
    cache: "no-store",
  })

  return parseResponse(res)
}

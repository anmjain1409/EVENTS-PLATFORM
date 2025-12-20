import type { EventInput } from "@/lib/validators/event.schema"

/* ================= TYPES ================= */

export type Event = {
  id: string
  title: string
  description: string
  location: string
  isOnline: boolean
  startDate: string
  endDate: string
}

type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
}

/* ================= BASE ================= */

const BASE_URL = "/api/events"

/* ================= GET ALL EVENTS ================= */

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(BASE_URL)

  if (!res.ok) {
    throw new Error("Failed to fetch events")
  }

  const json: ApiResponse<Event[]> = await res.json()

  if (!json.success) {
    throw new Error(json.message ?? "Something went wrong")
  }

  return json.data
}

/* ================= GET SINGLE EVENT ================= */

export async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`${BASE_URL}/${id}`)

  if (!res.ok) {
    throw new Error("Event not found")
  }

  const json: ApiResponse<Event> = await res.json()

  if (!json.success) {
    throw new Error(json.message ?? "Event not found")
  }

  return json.data
}

/* ================= CREATE EVENT ================= */

export async function createEvent(
  data: EventInput
): Promise<Event> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to create event")
  }

  const json: ApiResponse<Event> = await res.json()

  if (!json.success) {
    throw new Error(json.message ?? "Failed to create event")
  }

  return json.data
}

/* ================= UPDATE EVENT ================= */

export async function updateEvent(
  id: string,
  data: Partial<EventInput>
): Promise<Event> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to update event")
  }

  const json: ApiResponse<Event> = await res.json()

  if (!json.success) {
    throw new Error(json.message ?? "Failed to update event")
  }

  return json.data
}

/* ================= DELETE EVENT ================= */

export async function deleteEvent(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("Failed to delete event")
  }

  const json: ApiResponse<null> = await res.json()

  if (!json.success) {
    throw new Error(json.message ?? "Failed to delete event")
  }
}

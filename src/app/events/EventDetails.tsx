"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getEvent, deleteEvent } from "@/lib/api/event"
import { useRouter } from "next/navigation"

export default function EventDetail({ id }: { id: string }) {
  const router = useRouter()
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
  })

  const del = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] })
      router.push("/events")
    },
  })

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Event not found</p>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="my-4">{data.description}</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push(`/events/${id}/edit`)}
          className="btn"
        >
          Edit
        </button>

        <button
          onClick={() => del.mutate(id)}
          className="btn bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

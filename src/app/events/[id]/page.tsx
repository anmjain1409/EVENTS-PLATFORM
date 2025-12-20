"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getEvent, deleteEvent } from "@/lib/api/event"
import { useParams, useRouter } from "next/navigation"

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const qc = useQueryClient()

  const { data } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
  })

  const del = useMutation({
    mutationFn: () => deleteEvent(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] })
      router.push("/events")
    },
  })

  if (!data) return null

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p>{data.description}</p>

      <div className="flex gap-3 mt-4">
        <button onClick={() => router.push(`/events/${id}/edit`)} className="btn">
          Edit
        </button>
        <button onClick={() => del.mutate()} className="btn bg-red-500">
          Delete
        </button>
      </div>
    </div>
  )
}

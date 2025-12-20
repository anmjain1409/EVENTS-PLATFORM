"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getEvent, updateEvent } from "@/lib/api/event"
import { useParams, useRouter } from "next/navigation"

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const qc = useQueryClient()

  const { data } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
  })

  const mutation = useMutation({
    mutationFn: (payload: any) => updateEvent(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] })
      router.push(`/events/${id}`)
    },
  })

  if (!data) return null

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    mutation.mutate(Object.fromEntries(new FormData(e.currentTarget)))
  }

  return (
    <form onSubmit={submit} className="p-6 max-w-xl mx-auto space-y-3">
      <input name="title" defaultValue={data.title} className="input" />
      <input name="location" defaultValue={data.location} className="input" />
      <textarea name="description" defaultValue={data.description} className="input" />
      <button className="btn">Update</button>
    </form>
  )
}

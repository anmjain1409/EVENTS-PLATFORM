"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEvent } from "@/lib/api/event"
import { useRouter } from "next/navigation"

export default function CreateEventPage() {
  const router = useRouter()
  const qc = useQueryClient()

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] })
      router.push("/events")
    },
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    mutation.mutate(data as any)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-3">
      <input name="title" placeholder="Title" className="input" required />
      <input name="location" placeholder="Location" className="input" required />
      <textarea name="description" placeholder="Description" className="input" />
      <input name="startDate" type="datetime-local" className="input" />
      <input name="endDate" type="datetime-local" className="input" />

      <button className="btn">Create</button>
    </form>
  )
}

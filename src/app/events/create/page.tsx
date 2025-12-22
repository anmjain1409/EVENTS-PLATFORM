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

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    mutation.mutate({
      title: form.get("title") as string,
      description: form.get("description") as string,
      location: form.get("location") as string,
      isOnline: false,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    })
  }

  return (
    <form onSubmit={submit} className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Create Event</h1>
      <input name="title" placeholder="Title" className="input" />
      <input name="location" placeholder="Location" className="input" />
      <textarea name="description" placeholder="Description" className="input" />
      <button className="btn">Create</button>
    </form>
  )
}

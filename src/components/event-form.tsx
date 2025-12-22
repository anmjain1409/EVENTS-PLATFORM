"use client"

import * as React from "react"

type EventFormProps = {
  defaultValues?: {
    title?: string
    description?: string
    location?: string
    isOnline?: boolean
    startDate?: string
    endDate?: string
  }
  onSubmit: (data: any) => void
  isSubmitting?: boolean
}

export default function EventForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: EventFormProps) {
  const [form, setForm] = React.useState({
    title: defaultValues?.title ?? "",
    description: defaultValues?.description ?? "",
    location: defaultValues?.location ?? "",
    isOnline: defaultValues?.isOnline ?? false,
    startDate: defaultValues?.startDate?.slice(0, 10) ?? "",
    endDate: defaultValues?.endDate?.slice(0, 10) ?? "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Event title"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isOnline"
          checked={form.isOnline}
          onChange={handleChange}
        />
        Online Event
      </label>

      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {isSubmitting ? "Saving..." : "Save Event"}
      </button>
    </form>
  )
}

"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getEvent, deleteEvent } from "@/lib/api/event"
import { motion } from "framer-motion"
import LoadingState from "@/components/LoadingState"

type PageProps = {
  params: Promise<{ id: string }>
}

export default function EventDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  })

  const del = useMutation({
    mutationFn: () => deleteEvent(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] })
      router.push("/events")
    },
  })

  if (isLoading) return <LoadingState text="Loading event..." />

  if (!data) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-red-600">
          Event not found
        </h2>
        <button
          onClick={() => router.push("/events")}
          className="mt-4 px-5 py-2 rounded-md bg-black text-white"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 py-10"
    >
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-gray-600 mt-4">{data.description}</p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push(`/events/${id}/edit`)}
          className="px-4 py-2 rounded-md border"
        >
          Edit
        </button>

        <button
          onClick={() => del.mutate()}
          className="px-4 py-2 rounded-md bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </motion.div>
  )
}

"use client"

import { useQuery } from "@tanstack/react-query"
import { getEvents } from "@/lib/api/event"
import Link from "next/link"
import { motion } from "framer-motion"

export default function EventsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  if (isLoading) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/events/create" className="btn">
          Create Event
        </Link>
      </div>

      <div className="space-y-4">
        {data?.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-white rounded shadow"
          >
            <h2 className="font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-600">{event.location}</p>

            <Link
              href={`/events/${event.id}`}
              className="text-blue-600 text-sm"
            >
              View →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

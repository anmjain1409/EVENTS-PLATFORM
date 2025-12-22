"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { motion } from "framer-motion"

import { getEvents } from "@/lib/api/event"
import EventCard from "@/components/EventCard"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import EmptyState from "@/components/EmptyState"
import ErrorState from "@/components/ErrorState"

export default function EventsPage() {
  const {
    data: events = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })

  /* =========================
     UI STATES
  ========================= */
  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />
  }

  if (events.length === 0) {
    return <EmptyState />
  }

  /* =========================
     MAIN UI
  ========================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>

        <Link href="/events/create">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            + Create Event
          </motion.button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </motion.div>
  )
}

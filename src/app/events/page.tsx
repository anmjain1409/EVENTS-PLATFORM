"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { motion } from "framer-motion"

import { getEvents } from "@/lib/api/event"
import EventCard from "@/components/EventCard"
import { EmptyState } from "@/components/EmptyState"
import { ErrorState } from "@/components/ErrorState"
import { LoadingSkeleton } from "@/components/LoadingSkeleton"

/* =========================
   PAGE
========================= */
export default function EventsPage() {
  const {
    data: events,
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

  if (!events || events.length === 0) {
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Events</h1>

        <Link href="/events/create">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            + Create Event
          </motion.button>
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </motion.div>
  )
}

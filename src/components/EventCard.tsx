"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        className="border rounded-xl p-5 cursor-pointer bg-white shadow-sm hover:shadow-md"
      >
        <h2 className="text-lg font-semibold mb-1">{event.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{event.description}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            {new Date(event.startDate).toLocaleDateString()}
          </span>
          {event.location && (
            <span className="px-2 py-1 bg-gray-100 rounded">
              {event.location}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  )
}

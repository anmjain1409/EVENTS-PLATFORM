import Link from "next/link"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold">No events found</h2>
      <p className="text-gray-500 mt-2">
        Create your first event to get started
      </p>

      <Link
        href="/events/create"
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
      >
        Create Event
      </Link>
    </div>
  )
}

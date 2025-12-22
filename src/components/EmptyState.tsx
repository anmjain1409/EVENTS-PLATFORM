import Link from "next/link"

export default function EmptyState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold mb-2">No events found</h2>
      <p className="text-gray-500 mb-4">
        Create your first event to get started 🚀
      </p>

      <Link href="/events/create">
        <button className="bg-black text-white px-4 py-2 rounded-md">
          Create Event
        </button>
      </Link>
    </div>
  )
}

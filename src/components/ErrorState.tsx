export default function ErrorState({
  onRetry,
}: {
  onRetry: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="border rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-4">
          Please try again
        </p>

        <button
          onClick={onRetry}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

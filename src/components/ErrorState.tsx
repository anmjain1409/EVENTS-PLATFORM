type Props = {
  onRetry: () => void
}

export function ErrorState({ onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="rounded-xl border p-6 text-center max-w-md">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-gray-500 mt-2">
          Failed to load events. Please try again.
        </p>

        <button
          onClick={onRetry}
          className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

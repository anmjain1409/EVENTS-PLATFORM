type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export const ErrorState = ({
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
      <p className="mb-2">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  )
}

type ErrorStateProps = {
  message: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
      {message}
    </div>
  )
}

"use client"

export default function LoadingState({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[250px]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
        <p className="text-sm text-gray-500">
          {text || "Loading..."}
        </p>
      </div>
    </div>
  )
}

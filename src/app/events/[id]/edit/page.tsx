"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { getEvent, updateEvent } from "@/lib/api/event"
import EventForm from "@/components/event-form"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import ErrorState from "@/components/ErrorState"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default function EditEventPage({ params }: PageProps) {
  // ✅ IMPORTANT: unwrap params Promise
  const { id } = React.use(params)

  const router = useRouter()
  const queryClient = useQueryClient()

  /* =========================
     FETCH EVENT
  ========================= */
  const {
    data: event,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  })

  /* =========================
     UPDATE EVENT
  ========================= */
  const mutation = useMutation({
    mutationFn: (data: any) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] })
      queryClient.invalidateQueries({ queryKey: ["event", id] })
      router.push(`/events/${id}`)
    },
  })

  /* =========================
     UI STATES
  ========================= */
  if (isLoading) return <LoadingSkeleton />

  if (isError || !event) {
    return <ErrorState onRetry={refetch} />
  }

  /* =========================
     MAIN UI
  ========================= */
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Event</h1>

      <EventForm
        defaultValues={event}
        onSubmit={(data) => mutation.mutate(data)}
        isSubmitting={mutation.isPending}
      />
    </div>
  )
}

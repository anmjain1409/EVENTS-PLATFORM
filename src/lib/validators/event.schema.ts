import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  location: z.string(),
  isOnline: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  coverImageUrl: z.string().url().optional()
})

export type EventInput = z.infer<typeof eventSchema>

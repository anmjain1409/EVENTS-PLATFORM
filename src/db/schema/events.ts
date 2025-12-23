import { pgTable, varchar, timestamp, boolean } from "drizzle-orm/pg-core"

export const events = pgTable("events", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  location: varchar("location", { length: 255 }),
  isOnline: boolean("is_online").default(false),

  coverImageUrl: varchar("cover_image_url", { length: 255 }),

  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

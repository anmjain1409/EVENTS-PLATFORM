import {
  mysqlTable,
  varchar,
  text,
  datetime,
  boolean
} from "drizzle-orm/mysql-core"

export const events = mysqlTable("events", {
  id: varchar("id", { length: 36 }).primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  location: varchar("location", { length: 255 }).notNull(),

  isOnline: boolean("is_online").default(false),

  startDate: datetime("start_date").notNull(),

  endDate: datetime("end_date").notNull(),

  coverImageUrl: text("cover_image_url"),

  createdAt: datetime("created_at")
    .notNull()
    .default(new Date()),

  updatedAt: datetime("updated_at")
    .notNull()
    .default(new Date())
})

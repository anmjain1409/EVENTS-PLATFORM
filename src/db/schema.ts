import {
  mysqlTable,
  varchar,
  text,
  boolean,
  datetime,
  timestamp
} from "drizzle-orm/mysql-core"

import { sql } from "drizzle-orm"

export const events = mysqlTable("events", {
  id: varchar("id", { length: 36 }).primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  location: varchar("location", { length: 255 }).notNull(),

  isOnline: boolean("is_online").default(false),

  startDate: datetime("start_date").notNull(),

  endDate: datetime("end_date").notNull(),

  coverImageUrl: text("cover_image_url"),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
})

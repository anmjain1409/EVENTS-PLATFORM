import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

let dbInstance: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (!dbInstance) {
    const sql = neon(process.env.DATABASE_URL!)
    dbInstance = drizzle(sql)
  }

  return dbInstance
}

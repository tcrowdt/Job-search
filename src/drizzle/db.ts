import { env } from "@/data/env/server"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "@/drizzle/schema"

const pool = new Pool({
  connectionString: env.DATABASE_URL + "?sslmode=require",
})

export const db = drizzle(pool, { schema })

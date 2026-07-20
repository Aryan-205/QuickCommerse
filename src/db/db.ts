import type { Database } from '../types/db.d.ts' 
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

// 1. Detect if we are on a local machine or a production cloud db
const isLocal = 
  !process.env.DB_URL || 
  process.env.DB_URL.includes('localhost') || 
  process.env.DB_URL.includes('127.0.0.1')

const dialect = new PostgresDialect({
  pool: new Pool({
    // Prefer the explicit environment variable, otherwise fallback to your exact Docker credentials
    connectionString: process.env.DB_URL || 'postgres://postgres:postgres2005@127.0.0.1:5432/large_commerce',
    max: 10,
    // 2. CRUCIAL FIX: If local, set ssl to false. If prod, enforce relaxed SSL checks.
    ssl: isLocal ? false : { rejectUnauthorized: false },
  })
})

export const db = new Kysely<Database>({
  dialect,
})
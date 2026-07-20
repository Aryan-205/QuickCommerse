// src/db/migrator.ts
import * as path from 'path'
import { promises as fs } from 'fs'
import { db } from './db' 

import { FileMigrationProvider, Migrator } from 'kysely/migration'

async function migrate() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(import.meta.dirname, 'migrations'),
    }),
  })

  const action = process.argv[2]

  const { error, results } = 
    action === 'down' 
      ? await migrator.migrateDown() // Modern Kysely uses migrateDown() for one step rollback
      : await migrator.migrateToLatest() //

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`✓ Migration "${it.migrationName}" executed successfully (${action || 'up'})`)
    } else if (it.status === 'Error') {
      console.error(`✗ Migration "${it.migrationName}" failed`)
    }
  })

  if (error) {
    console.error('Migration failed completely:', error)
    process.exit(1)
  }

  await db.destroy()
}

migrate()
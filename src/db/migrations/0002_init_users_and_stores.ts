import { Kysely, sql } from 'kysely' // Added sql import here

export async function up(db: Kysely<any>): Promise<void> {
  // Users Table
  await db.schema
    .createTable('users')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('password', 'varchar(255)', (col) => col.notNull())
    .addColumn('phone', 'varchar(20)', (col) => col.notNull().unique())
    .addColumn('profile_picture', 'text')
    .addColumn('role', 'varchar(50)', (col) => col.defaultTo('customer').notNull()) // Handled via app-level types
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute()

  // Dark Stores Table
  await db.schema
    .createTable('stores')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('code', 'varchar(50)', (col) => col.notNull().unique())
    .addColumn('phone', 'varchar(20)', (col) => col.notNull())
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('lat', 'decimal(9, 6)', (col) => col.notNull())
    .addColumn('lng', 'decimal(9, 6)', (col) => col.notNull())
    .addColumn('delivery_radius_km', 'decimal(4, 2)', (col) => col.notNull())
    .addColumn('is_active', 'boolean', (col) => col.defaultTo(true).notNull())
    .addColumn('is_open', 'boolean', (col) => col.defaultTo(true).notNull())
    .addColumn('opens_at', 'time')
    .addColumn('closes_at', 'time')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute()
}
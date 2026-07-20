import { Kysely, sql } from 'kysely' // Added sql import here

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('addresses')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('label', 'varchar(50)', (col) => col.notNull())
    .addColumn('address_line_1', 'text', (col) => col.notNull())
    .addColumn('address_line_2', 'text')
    .addColumn('city', 'varchar(100)', (col) => col.notNull())
    .addColumn('state', 'varchar(100)', (col) => col.notNull())
    .addColumn('country', 'varchar(100)', (col) => col.notNull())
    .addColumn('postal_code', 'varchar(20)', (col) => col.notNull())
    .addColumn('lat', 'decimal(9, 6)', (col) => col.notNull())
    .addColumn('lng', 'decimal(9, 6)', (col) => col.notNull())
    .addColumn('is_default', 'boolean', (col) => col.defaultTo(false).notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute()
}
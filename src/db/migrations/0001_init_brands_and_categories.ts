import { Kysely, sql } from 'kysely' // Added sql import here

export async function up(db: Kysely<any>): Promise<void> {
  // 1. Create independent lookups: Brands
  await db.schema
    .createTable('brands')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('slug', 'varchar(255)', (col) => col.notNull().unique())
    // Fix applied below using raw SQL wrappers:
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute()

  // 2. Categories Table (With self-referencing hierarchy)
  await db.schema
    .createTable('categories')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('slug', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('parent_id', 'integer', (col) => col.references('categories.id').onDelete('set null'))
    .addColumn('image_url', 'text')
    .addColumn('sort_order', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('is_active', 'boolean', (col) => col.defaultTo(true).notNull())
    // Fix applied below:
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('categories').execute()
  await db.schema.dropTable('brands').execute()
}
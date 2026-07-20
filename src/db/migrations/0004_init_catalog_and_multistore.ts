import {sql, Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Products Table
  await db.schema
    .createTable('products')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('category_id', 'integer', (col) => col.references('categories.id').onDelete('set null'))
    .addColumn('brand_id', 'integer', (col) => col.references('brands.id').onDelete('set null'))
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('slug', 'varchar(255)', (col) => col.notNull().unique())
    .addColumn('description', 'text')
    .addColumn('thumbnail_url', 'text')
    .addColumn('images', 'jsonb', (col) => col.defaultTo('[]').notNull()) // JSON arrays map nicely to ts types
    .addColumn('is_active', 'boolean', (col) => col.defaultTo(true).notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute()

  // Variants (e.g., milk 500ml vs 1L)
  await db.schema
    .createTable('product_variants')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('product_id', 'integer', (col) => col.references('products.id').onDelete('cascade').notNull())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('sku', 'varchar(100)', (col) => col.notNull().unique())
    .addColumn('barcode', 'varchar(100)')
    .addColumn('unit', 'varchar(20)', (col) => col.notNull())
    .addColumn('unit_value', 'decimal(10, 2)', (col) => col.notNull())
    .addColumn('mrp', 'decimal(10, 2)', (col) => col.notNull())
    .addColumn('thumbnail_url', 'text')
    .addColumn('is_active', 'boolean', (col) => col.defaultTo(true).notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .execute()

  // Store Inventory Table
  await db.schema
    .createTable('store_inventory')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('store_id', 'integer', (col) => col.references('stores.id').onDelete('cascade').notNull())
    .addColumn('variant_id', 'integer', (col) => col.references('product_variants.id').onDelete('cascade').notNull())
    .addColumn('selling_price', 'decimal(10, 2)', (col) => col.notNull())
    .addColumn('stock_quantity', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('reserved_quantity', 'integer', (col) => col.defaultTo(0).notNull())
    .addColumn('is_available', 'boolean', (col) => col.defaultTo(true).notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`NOW()`).notNull())
    .addUniqueConstraint('uidx_store_variant', ['store_id', 'variant_id'])
    .execute()
}
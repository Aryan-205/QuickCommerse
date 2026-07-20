import { sql, Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // 1. CREATE THE PARENT TABLE FIRST
  await db.schema
    .createTable('carts')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    // ... add your other carts columns here (user_id, created_at, etc.)
    .execute()

  // 2. NOW CREATE THE CHILD TABLE THAT REFERENCES IT
  await db.schema
    .createTable('cart_items')
    .addColumn('cart_id', 'integer', (col) => col.references('carts.id').onDelete('cascade').notNull())
    .addColumn('variant_id', 'integer', (col) => col.references('product_variants.id').onDelete('cascade').notNull())
    .addColumn('quantity', 'integer', (col) => col.defaultTo(1).notNull())
    .addPrimaryKeyConstraint('pk_cart_items', ['cart_id', 'variant_id'])
    .execute()

  // 3. Add any orders/order_items tables or indexes below
  // ...
}

export async function down(db: Kysely<any>): Promise<void> {
  // Always drop child tables before parent tables to prevent foreign key constraint violations on rollback
  await db.schema.dropTable('cart_items').execute()
  await db.schema.dropTable('carts').execute()
}
import { db } from '../db/db.ts'
import type { CreateItemInput, Item, UpdateItemInput } from '../db/types.ts'

class ProductRepository {
  async createProduct(productData: CreateItemInput): Promise<Item> {
    return db
      .insertInto('items')
      .values(productData)
      .returningAll()
      .executeTakeFirstOrThrow()
  }

  async getAllProducts(): Promise<Item[]> {
    return db.selectFrom('items').selectAll().execute()
  }

  async getProductById(id: number): Promise<Item | undefined> {
    return db
      .selectFrom('items')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()
  }

  async updateProduct(
    id: number,
    updateData: UpdateItemInput,
  ): Promise<Item | undefined> {
    return db
      .updateTable('items')
      .set({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

  async deleteProduct(id: number): Promise<number> {
    const result = await db
      .deleteFrom('items')
      .where('id', '=', id)
      .executeTakeFirst()
    return Number(result.numDeletedRows)
  }
}

export default new ProductRepository()

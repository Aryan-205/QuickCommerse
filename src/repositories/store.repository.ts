import { db } from '../db/db.ts'
import type { CreateStoreInput, Store, UpdateStoreInput } from '../db/types.ts'

export default class StoreRepository {
  public async createStore(storeData: CreateStore): Promise<Store> {
    return db.insertInto('stores').values(storeData).returningAll().executeTakeFirstOrThrow()
  }

  public async getStore(): Promise<Store[]> {
    return db.selectFrom('stores').selectAll().execute()
  }

  public async getStoreById(id: number): Promise<Store> {
    return db.selectFrom('stores').selectAll().where('id', '=', id).executeTakeFirstOrThrow()
  }

  public async updateStore(id: number, storeData: UpdateStoreInput): Promise<Store> {
    return db.updateTable('stores').set(storeData).where('id', '=', id).returningAll().executeTakeFirstOrThrow()
  }

  public async deleteStore(id: number): Promise<void> {
    await db.deleteFrom('stores').where('id', '=', id).execute()
  }
}
import type { CreateStoreInput, Store, UpdateStoreInput } from '../db/types.ts'
import StoreRepository from '../repositories/store.repository.ts'

const storeRepository = new StoreRepository()

export default class StoreService {
  public async createStore(storeData: CreateStoreInput): Promise<Store> {
    return storeRepository.createStore(storeData)
  }

  public async getStore(): Promise<Store[]> {
    return storeRepository.getStore()
  }

  public async getStoreById(id: number): Promise<Store> {
    return storeRepository.getStoreById(id)
  }

  public async updateStore(id: number, storeData: UpdateStoreInput): Promise<Store> {
    return storeRepository.updateStore(id, storeData)
  }

  public async deleteStore(id: number): Promise<void> {
    await storeRepository.deleteStore(id)
  }
}
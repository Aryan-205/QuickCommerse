import type { CreateItemInput, Item, UpdateItemInput } from '../db/types.ts'
import ItemsRepository from '../repositories/items.repository.ts'

const itemsRepository = new ItemsRepository()

export default class ItemService {
  public async createItem(itemData: CreateItemInput): Promise<Item> {
    return itemsRepository.createItem(itemData)
  }

  public async getAllItems(): Promise<Item[]> {
    return itemsRepository.getAllItems()
  }

  public async getItemById(id: number): Promise<Item> {
    return itemsRepository.getItemById(id)
  }
  
  public async updateItem(id: number, itemData: UpdateItemInput): Promise<Item> {
    return itemsRepository.updateItem(id, itemData)
  }

  public async deleteItem(id: number): Promise<void> {
    await itemsRepository.deleteItem(id)
  }
}
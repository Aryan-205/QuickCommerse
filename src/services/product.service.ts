import type { CreateItemInput, Item, UpdateItemInput } from '../db/types.ts'
import productRepository from '../repositories/product.repository.ts'

export default class ProductService {
  public async createProduct(productData: CreateItemInput): Promise<Item> {
    return productRepository.createProduct(productData)
  }

  public async getAllProducts(): Promise<Item[]> {
    return productRepository.getAllProducts()
  }

  public async getProductById(id: number): Promise<Item | undefined> {
    return productRepository.getProductById(id)
  }

  public async updateProduct(
    id: number,
    productData: UpdateItemInput,
  ): Promise<Item | undefined> {
    return productRepository.updateProduct(id, productData)
  }

  public async deleteProduct(id: number): Promise<void> {
    await productRepository.deleteProduct(id)
  }
}

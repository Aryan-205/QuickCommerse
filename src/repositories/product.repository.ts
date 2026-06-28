import db from '../config/db.config.ts';

class ProductRepository {
  // CREATE
  async createProduct(productData: any) {
    const [newProduct] = await db('products')
      .insert(productData)
      .returning('*');
    return newProduct;
  }

  // READ (All products)
  async getAllProducts() {
    return await db('products').select('*');
  }

  // READ (By ID)
  async getProductById(id: any) {
    return await db('products').where({ id }).first();
  }

  // UPDATE
  async updateProduct(id: any, updateData: any) {
    const [updatedProduct] = await db('products')
      .where({ id })
      .update(updateData)
      .returning('*');
    return updatedProduct;
  }

  // DELETE
  async deleteProduct(id: any) {
    return await db('products').where({ id }).del();
  }
}

export default new ProductRepository();
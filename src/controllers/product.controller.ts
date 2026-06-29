import type { Request, Response } from 'express'
import ProductService from '../services/product.service.ts'
import { handleError } from '../helpers/handleError.ts'

const productService = new ProductService()

export default class ProductController {
  public async createProduct(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body)
      res.status(201).json({ message: 'Product created successfully', product })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts()
      res.status(200).json({ message: 'Products fetched successfully', products })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async getProductById(req: Request, res: Response) {
    try {

      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product id' })
      }
      const product = await productService.getProductById(id)
      res.status(200).json({ message: 'Product fetched successfully', product })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async updateProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product id' })
      }
      const product = await productService.updateProduct(id, req.body)
      res.status(200).json({ message: 'Product updated successfully', product })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
  
  public async deleteProduct(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product id' })
      }
      await productService.deleteProduct(id)
      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
}
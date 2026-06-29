import type { Request, Response } from 'express'
import StoreService from '../services/store.service.ts'
import { handleError } from '../helpers/handleError.ts'

const storeService = new StoreService()

export default class StoreController {
  public async getStore(_req: Request, res: Response) {
    try {
      const store = await storeService.getStore()
      res.status(200).json({ message: 'Store fetched successfully', store })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async getStoreById(req: Request, res: Response) {

    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid store id' })
      }
      const store = await storeService.getStoreById(id)
      res.status(200).json({ message: 'Store fetched successfully', store })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async createStore(req: Request, res: Response) {
    try {
      const store = await storeService.createStore(req.body)
      res.status(201).json({ message: 'Store created successfully', store })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
  
  public async updateStore(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid store id' })
      }
      const store = await storeService.updateStore(id, req.body)
      res.status(200).json({ message: 'Store updated successfully', store })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
  
  public async deleteStore(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid store id' })
      }
      await storeService.deleteStore(id)
      res.status(200).json({ message: 'Store deleted successfully' })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
}
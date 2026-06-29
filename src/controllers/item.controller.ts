import type { Request, Response } from 'express'
import ItemService from '../services/item.service.ts'
import { handleError } from '../helpers/handleError.ts'

const itemService = new ItemService()

export default class ItemController {
  public async createItem(req: Request, res: Response) {
    try {
      const item = await itemService.createItem(req.body)
      res.status(201).json({ message: 'Item created successfully', item })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async getAllItems(req: Request, res: Response) {
    try {
      const items = await itemService.getAllItems()
      res.status(200).json({ message: 'Items fetched successfully', items })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async getItemById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid item id' })
      }
      const item = await itemService.getItemById(id)
      res.status(200).json({ message: 'Item fetched successfully', item })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
  
  public async updateItem(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid item id' })
      }
      const item = await itemService.updateItem(id, req.body)
      res.status(200).json({ message: 'Item updated successfully', item })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
  
  public async deleteItem(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid item id' })
      }
      await itemService.deleteItem(id)
      res.status(200).json({ message: 'Item deleted successfully' })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
}
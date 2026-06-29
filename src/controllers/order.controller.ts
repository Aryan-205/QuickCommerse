import type { Request, Response } from 'express'
import { handleError } from '../helpers/handleError.ts'
import OrderService from '../services/order.service.ts'

const orderService = new OrderService()

export default class OrderController {
  public async createOrder(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body)
      res.status(201).json({ message: 'Order created successfully', order })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async getOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getOrders()
      res.status(200).json({ message: 'Orders fetched successfully', orders })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async getOrderById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid order id' })
      }

      const order = await orderService.getOrderById(id)
      res.status(200).json({ message: 'Order fetched successfully', order })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async updateOrder(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid order id' })
      }

      const order = await orderService.updateOrder(id, req.body)
      res.status(200).json({ message: 'Order updated successfully', order })
    } catch (error) {
      handleError(res, error, 400)
    }
  }

  public async deleteOrder(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid order id' })
      }

      await orderService.deleteOrder(id)
      res.status(200).json({ message: 'Order deleted successfully' })
    } catch (error) {
      handleError(res, error, 400)
    }
  }
}
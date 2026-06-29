import { Router } from 'express'
import OrderController from '../controllers/order.controller.ts'

const router = Router()

const orderController = new OrderController()

router.post('/', orderController.createOrder.bind(orderController))
router.get('/', orderController.getOrders.bind(orderController))
router.get('/:id', orderController.getOrderById.bind(orderController))
router.put('/:id', orderController.updateOrder.bind(orderController))
router.delete('/:id', orderController.deleteOrder.bind(orderController))

export default router
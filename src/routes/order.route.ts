import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const orderRouter = Router()

const orderController  = new OrderController()

orderController.get("/store/:id", orderController.getOrderByStoreId)
orderController.get("/user/:id", orderController.getOrderByUserId)
orderController.post("/", orderController.createOrder)
orderController.put("/:id", orderController.updateOrderById)
orderController.delete("/:id", orderController.deleteOrderById)

export default orderRouter
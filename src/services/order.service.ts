import type { CreateOrderInput, Order, UpdateOrderInput } from '../db/types.ts'
import OrderRepository from '../repositories/order.repository.ts'

const orderRepository = new OrderRepository()

export default class OrderService {
  public async createOrder(orderData: CreateOrderInput): Promise<Order> {
    return orderRepository.createOrder(orderData)
  }

  public async getOrders(): Promise<Order[]> {
    return orderRepository.getOrders()
  }

  public async getOrderById(id: number): Promise<Order> {
    return orderRepository.getOrderById(id)
  }

  public async updateOrder(
    id: number,
    orderData: UpdateOrderInput,
  ): Promise<Order> {
    return orderRepository.updateOrder(id, orderData)
  }

  public async deleteOrder(id: number): Promise<void> {
    await orderRepository.deleteOrder(id)
  }
}

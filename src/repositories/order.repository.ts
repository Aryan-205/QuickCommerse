import { db } from "../db/db.ts";
import type { CreateOrderInput, Order, UpdateOrderInput } from "../db/types.ts";

export default class OrderRepository {
  public async createOrder(orderData: CreateOrderInput): Promise<Order> {
    return db.transaction().execute(async (trx) => {
      return trx
        .insertInto("orders")
        .values(orderData)
        .returningAll()
        .executeTakeFirstOrThrow();
    });
  }

  public async getOrders(): Promise<Order[]> {
    return db.selectFrom("orders").selectAll().execute();
  }

  public async getOrderById(id: number): Promise<Order> {
    return db
      .selectFrom("orders")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
  }

  public async updateOrder(
    id: number,
    orderData: UpdateOrderInput,
  ): Promise<Order> {
    return db
      .updateTable("orders")
      .set({
        ...orderData,
        updated_at: new Date().toISOString(),
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  public async deleteOrder(id: number): Promise<void> {
    await db.deleteFrom("orders").where("id", "=", id).execute();
  }
}

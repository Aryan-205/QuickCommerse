import { db } from "../db/db.ts";
import type { CreateItemInput, Item, UpdateItemInput } from "../db/types.ts";

export default class ItemsRepository {
  public async createItem(itemData: CreateItemInput): Promise<Item> {
    return db
      .insertInto("items")
      .values(itemData)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  public async getAllItems(): Promise<Item[]> {
    return db.selectFrom("items").selectAll().execute();
  }

  public async getItemById(id: number): Promise<Item> {
    return db
      .selectFrom("items")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();
  }

  public async updateItem(
    id: number,
    itemData: UpdateItemInput,
  ): Promise<Item> {
    return db
      .updateTable("items")
      .set(itemData)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  public async deleteItem(id: number): Promise<void> {
    await db.deleteFrom("items").where("id", "=", id).execute();
  }
}

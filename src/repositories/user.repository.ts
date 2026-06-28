import db from "../config/db.config";
import type {
  CreateCustomerInput,
  Customer,
  UpdateCustomerInput,
} from "../db/types";

class UserRepository {
  async createUser(userData: CreateCustomerInput): Promise<Customer> {
    const [newUser] = await db("customers")
      .insert(userData)
      .returning("*");
    return newUser;
  }

  async getAllUsers(): Promise<Customer[]> {
    return db("customers").select("*");
  }

  async getUserById(id: number): Promise<Customer | undefined> {
    return db("customers").where({ id }).first();
  }

  async getUserByEmail(email: string): Promise<Customer | undefined> {
    return db("customers").where({ email }).first();
  }

  async updateUser(
    id: number,
    updateData: UpdateCustomerInput
  ): Promise<Customer | undefined> {
    const [updatedUser] = await db("customers")
      .where({ id })
      .update({
        ...updateData,
        updated_at: db.fn.now(),
      })
      .returning("*");
    return updatedUser;
  }

  async deleteUser(id: number): Promise<number> {
    return db("customers").where({ id }).del();
  }
}

export default new UserRepository();

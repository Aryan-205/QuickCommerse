import { db } from '../db/db.ts'
import type {
  CreateCustomerInput,
  Customer,
  UpdateCustomerInput,
} from '../db/types.ts'

class UserRepository {
  async createUser(userData: CreateCustomerInput): Promise<Customer> {
    const { address, ...userFields } = userData

    return db.transaction().execute(async (trx) => {
      const user = await trx
        .insertInto('users')
        .values({
          ...userFields,
          profile_picture: null,
        })
        .returningAll()
        .executeTakeFirstOrThrow()

      await trx
        .insertInto('addresses')
        .values({
          ...address,
          user_id: user.id,
          rider_id: null,
          store_id: null,
        })
        .execute()

      return user
    })
  }

  async getAllUsers(): Promise<Customer[]> {
    return db.selectFrom('users').selectAll().execute()
  }

  async getUserById(id: number): Promise<Customer | undefined> {
    return db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()
  }

  async getUserByEmail(email: string): Promise<Customer | undefined> {
    return db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst()
  }

  async updateUser(
    id: number,
    updateData: UpdateCustomerInput,
  ): Promise<Customer | undefined> {
    return db
      .updateTable('users')
      .set({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

  async deleteUser(id: number): Promise<number> {
    const result = await db
      .deleteFrom('users')
      .where('id', '=', id)
      .executeTakeFirst()
    return Number(result.numDeletedRows)
  }
}

export default new UserRepository()

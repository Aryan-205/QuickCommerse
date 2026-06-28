import db from '../config/db.config.ts';

class UserRepository {
  async createUser(userData: any) {
    const [newUser] = await db('users')
      .insert(userData)
      .returning('*');
    return newUser;
  }

  async getUserById(id: any) {
    return await db('users').where({ id }).first();
  }

  async updateUser(id: any, updateData: any) {
    const [updatedUser] = await db('users')
      .where({ id })
      .update(updateData)
      .returning('*');
    return updatedUser;
  }

  async deleteUser(id: any) {
    return await db('users').where({ id }).del();
  }
}

export default new UserRepository();
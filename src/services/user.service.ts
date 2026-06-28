import userRepository from "../repositories/user.repository";
import type {
  CreateCustomerInput,
  Customer,
  PublicCustomer,
  UpdateCustomerInput,
} from "../db/types";

function toPublicCustomer(customer: Customer): PublicCustomer {
  const { password: _password, ...publicCustomer } = customer;
  return publicCustomer;
}

export default class UserService {
  public async createUser(
    userData: CreateCustomerInput
  ): Promise<PublicCustomer> {
    const { name, email, password, phone, address } = userData;

    if (!name || !email || !password || !phone || !address) {
      throw new Error("name, email, password, phone, and address are required");
    }

    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error("A user with this email already exists");
    }

    const user = await userRepository.createUser(userData);
    return toPublicCustomer(user);
  }

  public async getAllUsers(): Promise<PublicCustomer[]> {
    const users = await userRepository.getAllUsers();
    return users.map(toPublicCustomer);
  }

  public async getUserById(id: number): Promise<PublicCustomer> {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return toPublicCustomer(user);
  }

  public async updateUser(
    id: number,
    updateData: UpdateCustomerInput
  ): Promise<PublicCustomer> {
    const user = await userRepository.updateUser(id, updateData);
    if (!user) {
      throw new Error("User not found");
    }
    return toPublicCustomer(user);
  }

  public async deleteUser(id: number): Promise<void> {
    const deletedCount = await userRepository.deleteUser(id);
    if (!deletedCount) {
      throw new Error("User not found");
    }
  }
}

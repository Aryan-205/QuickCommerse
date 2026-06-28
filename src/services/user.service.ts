import userRepository from "../repositories/user.repository";

export default class UserService {
  public async createUser(userData: any) {
    return await userRepository.createUser(userData);
  }

  public async getUserById(id: any) {
    return await userRepository.getUserById(id);
  }
}
import userRepository from "../repositories/user.repository";
import type { Request, Response } from "express";

export default class UserController {
  
  public async createUser(req: Request, res: Response) {
    const userData = req.body;
    const user = await userRepository.createUser(userData);
    res.status(201).json({ message: "User created successfully", user });
  }

  public async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userRepository.getUserById(id);
    res.status(200).json({ message: "User fetched successfully", user });
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const updateData = req.body;
    const user = await userRepository.updateUser(id, updateData);
    res.status(200).json({ message: "User updated successfully", user });
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await userRepository.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  }
}
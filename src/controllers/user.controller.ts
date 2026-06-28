import UserService from "../services/user.service";
import type { Request, Response } from "express";

const userService = new UserService();

export default class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      this.handleError(res, error, 400);
    }
  }

  public async getAllUsers(_req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid user id" });
      }

      const user = await userService.getUserById(id);
      res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
      this.handleError(res, error, 404);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid user id" });
      }

      const user = await userService.updateUser(id, req.body);
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      this.handleError(res, error, 404);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid user id" });
      }

      await userService.deleteUser(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      this.handleError(res, error, 404);
    }
  }

  private handleError(res: Response, error: unknown, status = 500) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    const responseStatus =
      message === "A user with this email already exists" ? 409 : status;

    res.status(responseStatus).json({ message });
  }
}

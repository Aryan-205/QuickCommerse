import { Request, Response } from "express";
import UserService from "../services/user.service";
import { handleError } from "../helpers/handleError";

const userService = new UserService();
export default class UserController {

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const user = await userService.getUserById.bind(id);
      
      res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
      handleError(error, "Failed at UserController.getUserById");
    }
  };

  public updateUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedUser = await userService.updateUserById.bind(id, req.body);
      
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      handleError(error, "Failed at UserController.updateUserById");
    }
  };

  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.userService.deleteUserById(id);
      
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      handleError(error, "Failed at UserController.deleteUserById");
    }
  };
}
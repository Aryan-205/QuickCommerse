import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router(); 

const userController = new UserController(); 

userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUserById);
userRouter.delete("/:id", userController.deleteUserById);

export default userRouter;
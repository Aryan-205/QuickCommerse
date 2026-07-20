import { Router } from "express";


const userRouter = Router

const userController = new UserController

userRouter.get("/:id", getUserById)
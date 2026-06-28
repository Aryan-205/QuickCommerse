import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", (req, res) => {
  res.send("Users fetched successfully");
});

userRouter.post("/create", (req, res) => {
  res.send("User created successfully");
});

userRouter.put("/update", (req, res) => {
  res.send("User updated successfully");
});

userRouter.delete("/delete", (req, res) => {
  res.send("User deleted successfully");
});

export default userRouter;
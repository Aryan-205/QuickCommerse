import express from "express";
import userRouter from "./user.route";
import productRouter from "./product.route";

const app = express();

app.use("/users", userRouter);
app.use("/products", productRouter);

export default app;
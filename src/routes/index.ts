import express from "express";
import userRouter from "./user.route";
import productRouter from "./product.route";
import itemRouter from "./item.route";
import orderRouter from "./order.route";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/items", itemRouter);
app.use("/orders", orderRouter);

export default app;

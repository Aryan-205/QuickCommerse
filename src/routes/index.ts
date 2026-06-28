import express from "express";
import userRouter from "./user.route";
import productRouter from "./product.route";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/users", userRouter);
app.use("/products", productRouter);

export default app;

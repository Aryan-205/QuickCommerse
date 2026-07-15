import express from "express";
import userRouter from "./user.route";
import productRouter from "./product.route";
import itemRouter from "./item.route";
import orderRouter from "./order.route";
import { generateOpenApiDocument } from "../openapi/registry";
import { serve, setup } from "swagger-ui-express";

const app = express();

const openApiDocument = generateOpenApiDocument();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/openapi.json", (_req, res) => {
  res.status(200).json(openApiDocument);
});

app.use("/api-docs", serve, setup(openApiDocument));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/items", itemRouter);
app.use("/orders", orderRouter);

export default app;

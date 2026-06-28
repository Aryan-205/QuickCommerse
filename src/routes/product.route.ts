import { Router } from "express";

const productRouter = Router();

productRouter.get("/:id", (req, res) => {
  res.send("Product fetched successfully");
});

productRouter.post("/create", (req, res) => {
  res.send("Product created successfully");
});

productRouter.put("/update", (req, res) => {
  res.send("Product updated successfully");
});

productRouter.delete("/delete", (req, res) => {
  res.send("Product deleted successfully");
});

export default productRouter;
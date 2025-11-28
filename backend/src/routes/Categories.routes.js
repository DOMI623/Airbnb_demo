import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/Create", protect, createCategory);
categoriesRouter.get("/Get", getCategories);
categoriesRouter.put("/update/:id", protect, updateCategory);
categoriesRouter.delete("/delete/:id", protect, deleteCategory);

export default categoriesRouter;

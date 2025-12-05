import express from "express";
import {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const roleRouter = express.Router();

roleRouter.get("/get", getAllRoles);

roleRouter.post("/create", protect, createRole);

roleRouter.put("/update/:id", protect, updateRole);

roleRouter.delete("/delete/:id", protect, deleteRole);

export default roleRouter;

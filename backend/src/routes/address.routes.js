import express from "express";
import {
  createAddress,
  getMyAddresses,
  getAddresses,
  deleteAdress,
} from "../controllers/address.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const addressRouter = express.Router();

addressRouter.post("/create", protect, createAddress);
addressRouter.get("/get/me", protect, getMyAddresses);
addressRouter.get("/get", protect, getAddresses);
addressRouter.delete("/addresses/:id", protect, deleteAdress);

export default addressRouter;

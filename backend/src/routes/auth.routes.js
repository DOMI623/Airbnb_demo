import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getMe } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/me", protect, getMe);

export default authRouter;

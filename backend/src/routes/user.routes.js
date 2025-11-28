import express from "express";
import { register, Login } from "../controllers/user.controller.js";

const userRouter = express.Router();

// Rutas de usuario
userRouter.post("/register", register);
userRouter.post("/login", Login);

export default userRouter;

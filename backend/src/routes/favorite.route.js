import express from "express";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite,
} from "../controllers/favorite.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/add", protect, addFavorite);
favoriteRouter.get("/user/:userId", protect, getUserFavorites);
favoriteRouter.delete("/remove", protect, removeFavorite);

export default favoriteRouter;

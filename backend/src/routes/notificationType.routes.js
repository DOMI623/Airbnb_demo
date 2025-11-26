import express from "express";
import {
  createNotificationType,
  getNotificationTypes,
  updateNotificationType,
  getNotificationTypeById,
  deleteNotificationType,
} from "../controllers/notificationType.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const NotificationTypeRouter = express.Router();

NotificationTypeRouter.post("/create", protect, createNotificationType);
NotificationTypeRouter.get("/getAll", protect, getNotificationTypes);
NotificationTypeRouter.get("/get/:id", protect, getNotificationTypeById);
NotificationTypeRouter.put("/update/:id", protect, updateNotificationType);
NotificationTypeRouter.delete("/delete/:id", protect, deleteNotificationType);

export default NotificationTypeRouter;

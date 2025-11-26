import express from "express";
import {
  createNotification as sendNotification,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/Notification.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const NotificationRouter = express.Router();

NotificationRouter.post("/create", protect, sendNotification);
NotificationRouter.get("/get/:userId", protect, getNotificationsByUser);
NotificationRouter.get(
  "/read/:notificationId",
  protect,
  markNotificationAsRead
);
NotificationRouter.delete(
  "/delete/:notificationId",
  protect,
  deleteNotification
);

export default NotificationRouter;

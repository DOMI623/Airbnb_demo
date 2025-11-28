import express from "express";
import {
  getAllBookingStatuses,
  createBookingStatus,
  updateBookingStatus,
  deleteBookingStatus,
} from "../controllers/bookingStatus.Controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const bookingStatusRouter = express.Router();

bookingStatusRouter.get(
  "/booking-statuses/getAll",
  protect,
  getAllBookingStatuses
);
bookingStatusRouter.post(
  "/booking-statuses/create",
  protect,
  createBookingStatus
);
bookingStatusRouter.put(
  "/booking-statuses/update/:id",
  protect,
  updateBookingStatus
);
bookingStatusRouter.delete(
  "/booking-statuses/delete/:id",
  protect,
  deleteBookingStatus
);

export default bookingStatusRouter;

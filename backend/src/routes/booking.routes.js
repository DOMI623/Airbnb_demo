import express from "express";
import {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const BookingRouter = express.Router();

// Controller functions (to be implemented)

BookingRouter.post("/create", protect, createBooking);
BookingRouter.get("/GetAll", protect, getAllBookings);
BookingRouter.get("/get/:id", protect, getBookingById);
BookingRouter.put("/update/:id", protect, updateBooking);
BookingRouter.delete("/delete/:id", protect, deleteBooking);

export default BookingRouter;

import express from "express";
import {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";
const BookingRouter = express.Router();

// Controller functions (to be implemented)
BookingRouter.post("/create", createBooking);
BookingRouter.get("/GetAll", getAllBookings);
BookingRouter.get("/get/:id", getBookingById);
BookingRouter.put("/update/:id", updateBooking);
BookingRouter.delete("/delete/:id", deleteBooking);

export default BookingRouter;

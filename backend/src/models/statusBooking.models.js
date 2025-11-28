import mongoose from "mongoose";

const bookingStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    color: {
      type: String,
    },
    isFinal: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const BookingStatus = mongoose.model("BookingStatus", bookingStatusSchema);

export default BookingStatus;

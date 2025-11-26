import mongoose from "mongoose";

const notificationTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sendEmail: {
      type: Boolean,
      default: false,
    },
    sendInApp: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false }
);

const NotificationType = mongoose.model(
  "NotificationType",
  notificationTypeSchema
);
export default NotificationType;

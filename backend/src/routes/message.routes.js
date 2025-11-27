import express from "express";
import {
  getChatHistory,
  getConversations,
  sendMessage,
} from "../controllers/message.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const MessageRouter = express.Router();

MessageRouter.get("/messages/:userId", protect, getChatHistory);
MessageRouter.get("/conversations", protect, getConversations);
MessageRouter.post("/messages/send", protect, sendMessage);

export default MessageRouter;

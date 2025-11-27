import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import express from "express";
import { connectDB } from "./src/config/db.js";
import { seedNotificationTypes } from "./src/seed/notificationType.seed.js";
import { socketMiddleware } from "./src/middlewares/socketMiddleware.js";

import userRouter from "./src/routes/user.routes.js";
import NotificationRouter from "./src/routes/Notification.routes.js";
import bookingRouter from "./src/routes/booking.routes.js";
import NotificationTypeRouter from "./src/routes/NotificationType.routes.js";
import MessageRouter from "./src/routes/message.routes.js";

dotenv.config();

const PORT = process.env.PORT;

await connectDB();
await seedNotificationTypes();

const app = express();

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(socketMiddleware(io));

// Rutas
app.use("/api/bookings", bookingRouter);
app.use("/api/users", userRouter);
app.use("/api/notifications", NotificationRouter);
app.use("/api/notification-types", NotificationTypeRouter);
app.use("/api/chatAibnb", MessageRouter);

app.get("/", (req, res) => {
  res.send("Backend Airbnb funcionando");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    socket.join(userId.toString());
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

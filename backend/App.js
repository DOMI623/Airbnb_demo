import express from "express";
import userRouter from "./src/routes/user.routes.js";
import NotificationRouter from "./src/routes/Notification.routes.js";
import bookingRouter from "./src/routes/booking.routes.js";
import NotificationTypeRouter from "./src/routes/NotificationType.routes.js";

const app = express();

app.use(express.json());

// Rutas de apis
app.use("/api/bookings", bookingRouter);
app.use("/api/users", userRouter);
app.use("/api/notifications", NotificationRouter);
app.use("/api/notification-types", NotificationTypeRouter);

// api principal de prueba
app.get("/", (req, res) => {
  res.send("Backend Airbnb funcionando");
});

export default app;

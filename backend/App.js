import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import userRouter from "./src/routes/user.routes.js";
import bookingRouter from "./src/routes/booking.routes.js";

// config de dotenv
dotenv.config();

connectDB();
const app = express();

app.use(express.json());

// Rutas de apis
app.use("/api/bookings", bookingRouter);
app.use("/api/users", userRouter);

// api principal de prueba
app.get("/", (req, res) => {
  res.send("Backend Airbnb funcionando");
});

export default app;

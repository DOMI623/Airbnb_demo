import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import app from "./App.js";
import { connectDB } from "./src/config/db.js";
import { seedNotificationTypes } from "./src/seed/notificationType.seed.js";

dotenv.config();

const PORT = process.env.PORT;

// conectar a Mongo
await connectDB();

// ejecutar seed
await seedNotificationTypes();

// crear servidor HTTP
const server = http.createServer(app);

// socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// injectar io a express
app.use((req, res, next) => {
  req.io = io;
  next();
});

// manejar conexiones
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    socket.join(userId.toString());
    console.log(`User ${userId} joined room ${userId}`);
  });
});

// iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

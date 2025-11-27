import Message from "./src/models/Message.js";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    socket.join(userId.toString());
  });

  socket.on("send-message", async (data) => {
    const { from, to, content, listing } = data;

    const message = await Message.create({
      from,
      to,
      content,
      listing,
    });

    io.to(to.toString()).emit("receive-message", message);

    io.to(from.toString()).emit("message-sent", message);
  });
});

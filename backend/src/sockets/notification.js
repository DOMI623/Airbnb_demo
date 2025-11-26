export const sendNotification = (io, userId, notification) => {
  if (!io) {
    console.error("Socket.io instance is missing");
    return;
  }

  if (!userId) {
    console.error("UserId is missing in sendNotification");
    return;
  }

  // Emitir al room del usuario
  io.to(userId.toString()).emit("notification", notification);

  console.log(`Notificación enviada al usuario ${userId}`);
};

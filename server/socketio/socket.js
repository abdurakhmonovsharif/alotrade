const jwt = require("jsonwebtoken");
const config = require("config");
const socketIO = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    !decoded && socket.emit("error", { message: "Вы не авторизованы" });
    next();
  });
  io.on("connection", (socket) => {
    socket.on("sendMessage", ({ offer, message, recipient }) => {
      io.emit("newMessage", { offer, message, recipient });
    });
  });
};

module.exports = { socketIO };

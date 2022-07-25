const logger = require("../log");

module.exports = (socket, io) => {
  logger.info("A user connected.");

  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });
};

const { playerJoin, getCurrentPlayer, playerLeave, getRoomPlayers } = require("../utils/socketUsers");

exports = module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Player joined");
    // socket.on("add-transactions", (data) => {
    //   io.emit("add-transactions-display", data);
    // });

    socket.on("joinGameRoom", (data) => {
      console.log(data.id);
      playerJoin(data.id, data.board);
      socket.join(data);
      io.emit("join", "hello");
    });

    socket.on("move", (data) => {
      socket.broadcast.to(data.id).emit("sex");
    });

    socket.on("disconnect", () => {
      console.log("Disconnectted");
    });
  });
};

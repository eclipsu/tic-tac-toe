const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("../utils/socketUsers");

exports = module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("Player joined");
    // socket.on("add-transactions", (data) => {
    //   io.emit("add-transactions-display", data);
    // });

    socket.on("joinGameRoom", (data) => {
      console.log(data);
      // if (user === null) return;
      //   socket.join(user.shop_id);
    });

    socket.on("PrivateShopRoomServer", (data) => {
      const user = decode(data.token);
      if (user === null) return;
      const nepali_date = getNepaliDate();

      const newTransaction = {
        title: data.transaction.title,
        amount: data.transaction.amount,
        type: data.transaction.type,
        year: nepali_date.year,
        month: nepali_date.month,
        date: nepali_date.day,
      };

      socket.broadcast.to(user.shop_id).emit("PrivateShopRoom", newTransaction);
    });

    socket.on("disconnect", () => {
      console.log("Disconnectted");
    });
  });
};

const rooms = [];

const playerJoin = (roomID, board) => {
  const room = { roomID: roomID, board: board };
  rooms.push(room);
  return room;
};

const getCurrentPlayer = (roomID) => {
  return rooms.find((user) => user.roomID === roomID);
};

const changeBoard = (roomID, newBoard) => {
  const roomIndex = rooms.findIndex((room) => (room.roomID = roomID));
  return (rooms[roomIndex].board = newBoard);
};

const playerLeave = (roomID) => {
  const index = rooms.findIndex((room) => room.roomID === roomID);
  if (index === -1) return;
  return room.splice(index, 1)[0];
};

module.exports = { playerJoin, getCurrentPlayer, playerLeave };

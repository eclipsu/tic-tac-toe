const players = [];

const playerJoin = (id, room) => {
  const player = { id, room };
  players.push(player);
  return player;
};

const getCurrentPlayer = (id) => {
  return players.find((user) => user.id === id);
};

const playerLeave = (id) => {
  const index = players.findIndex((player) => player.id === id);
  if (index === -1) return;
  return player.splice(index, 1)[0];
};

const getRoomPlayers = (room) => {
  return players.filter((playr) => player.room === room);
};

module.exports = { playerJoin, getCurrentPlayer, playerLeave, getRoomPlayers };

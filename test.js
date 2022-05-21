const a = [
  { roomID: "2", board: [1, 2] },
  { roomID: "3", board: [3, 2] },
];
const room = a.findIndex((room) => room.roomID === "2");

console.log(room);

a[room].board = [33, 44];

console.log(a[0]);

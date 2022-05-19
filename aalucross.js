// const gameBoard = ["x", "x", "x", "-", "-", "-", "-", "-", "-"]; // Win (0, 1, 2)
// const gameBoard = ["o", "-", "-", "-", "o", "-", "-", "-", "o"]; // Win (0, 4, 8)
const gameBoard = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]; //Stalemate
let winner = "?";
const checkWin = (p, q, r) => {
  if (gameBoard[p] === "-") return false;
  if (gameBoard[p] !== gameBoard[q]) return false;
  if (gameBoard[p] !== gameBoard[r]) return false;
  winner = gameBoard[p];
  return true;
};

const isStalemate = () => {
  return gameBoard.every((e) => {
    return e === "-";
  });
};

console.log(`\n${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}\n--+---+--\n${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}\n--+---+--\n${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}\n`);
checkWin(0, 1, 2);
checkWin(0, 4, 8);
if (isStalemate()) winner = "Stalemate";
console.log(`${winner}`);

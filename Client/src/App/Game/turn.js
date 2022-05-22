import { minimax } from "./minimax";

export const turn = (newBoard, player, setGameBoard, setXisNext, xIsNext) => {
  const aiPlayer = "O";
  if (player === aiPlayer) {
    const boardCopy = [...newBoard];
    boardCopy[minimax(newBoard, player).index] = player;
    setGameBoard(boardCopy);
    setXisNext(!xIsNext);
  }
};

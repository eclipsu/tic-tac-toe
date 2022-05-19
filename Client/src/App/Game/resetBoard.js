export function resetBoard(setBoard, setXisNext, winner) {
  setBoard(Array(9).fill(null));
  setXisNext(true);
  winner = "";
}

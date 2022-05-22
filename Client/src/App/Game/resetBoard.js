export function resetBoard(setBoard, setXisNext, winner) {
  setBoard(Array.from(Array(9).keys()));
  setXisNext(true);
  winner = "";
}

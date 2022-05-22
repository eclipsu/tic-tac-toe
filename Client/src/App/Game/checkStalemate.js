export function checkStalemate(board, winner) {
  const emptySpaces = board.filter((s) => s !== "O" && s !== "X");
  if (emptySpaces.length === 0 && winner === null) return true;
  return false;
}

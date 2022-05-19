const isEveryCellOccupied = (cells) => {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == null) return false;
  }
  return true;
};

export function checkStalemate(cells, winner) {
  if (isEveryCellOccupied(cells) && winner === null) return true;
  return false;
}

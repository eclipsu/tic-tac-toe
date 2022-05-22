const { checkWinner } = require("./checkWin");

// human
var huPlayer = "O";

// ai
var aiPlayer = "X";

// returns list of the indexes of empty spots on the board
function emptyIndexies(board) {
  return board.filter((s) => s !== "O" && s !== "X");
}

// winning combinations using the board indexies
function winning(board, player) {
  if (player === checkWinner(board)) return true;
}

function minimax(newBoard, player) {
  var availSpots = emptyIndexies(newBoard);

  if (winning(newBoard, huPlayer)) {
    return { score: -1 * (availSpots.length + 1) };
  } else if (winning(newBoard, aiPlayer)) {
    return { score: 1 * (availSpots.length + 1) };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      // eslint-disable-next-line
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var j = 0; j < moves.length; j++) {
      if (moves[j].score > bestScore) {
        bestScore = moves[j].score;
        bestMove = j;
      }
    }
  } else {
    // eslint-disable-next-line
    var bestScore = 10000;
    // eslint-disable-next-line
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

export { minimax };

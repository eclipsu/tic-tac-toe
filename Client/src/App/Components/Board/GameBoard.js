import React, { useState } from "react";
import Cell from "./Cell";
import "../../Styles/Board/Board.css";
import { checkWinner } from "../../Game/checkWin";
import { checkStalemate } from "../../Game/checkStalemate";

const GameBoard = (props) => {
  // eslint-disable-next-line
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  // eslint-disable-next-line
  const [xIsNext, setXisNext] = useState(true);
  // eslint-disable-next-line
  const winner = checkWinner(gameBoard);
  // eslint-disable-next-line
  const [errMsg, setErrMsg] = useState("");

  const onClick = (i) => {
    const boardCopy = [...gameBoard];

    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? "X" : "O";
    setGameBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  return (
    <div className="game-board-container">
      <div className="board">
        {gameBoard.map((cell, i) => {
          return <Cell index={i} key={i} value={cell} onClick={() => onClick(i)} />;
        })}
      </div>
      {!checkStalemate(gameBoard, winner) ? <p className="winner">{winner ? `Winner : ${winner}` : `NextPlayer: ${xIsNext ? "X" : "O"}`}</p> : ""}
      {checkStalemate(gameBoard, winner) ? <p className="winner">No one won</p> : ""}
    </div>
  );
};

export default GameBoard;

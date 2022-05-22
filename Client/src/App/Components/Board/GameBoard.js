import React, { useState } from "react";
import useSound from "use-sound";

// Game lib
import { checkWinner } from "../../Game/checkWin";
import { checkStalemate } from "../../Game/checkStalemate";
import { resetBoard } from "../../Game/resetBoard";

// Styles
import "../../Styles/Board/Board.css";
import "../../Styles/Board/TopSection.css";

// functional compotnents
import TopSection from "../UI/TopSection";
import Bottom from "../UI/Bottom";
import Footer from "./Footer";

// audio files
import write from "../../Utils/Sounds/draw.wav";
// import loose from "../../Utils/Sounds/loose.wav";
import win from "../../Utils/Sounds/win.wav";

const GameBoard = (props) => {
  const [gameBoard, setGameBoard] = useState(Array.from(Array(9).keys())); // Game Board Array with null being empty spots
  const [xIsNext, setXisNext] = useState(true); // Returns whose turn is next true is x's false is o's

  // State for styling the button press
  const [activeState, changeActiveState] = useState({ activeObj: { id: 2 }, objects: [{ id: 1 }, { id: 2 }] });

  // sfxs
  const [writeSfx] = useSound(write);
  const [winSfx] = useSound(win);

  // Returns who the winner is, null if none
  let winner = checkWinner(gameBoard, winSfx);

  const toggleActive = (i) => {
    changeActiveState({ ...activeState, activeObj: activeState.objects[i] });
  };
  const toggleActiveStyle = (i) => {
    if (activeState.objects[i].id === activeState.activeObj.id) return "active";
    return "inactive";
  };

  const onClick = (i) => {
    const boardCopy = [...gameBoard];
    if (winner || typeof boardCopy[i] !== "number") return;
    writeSfx();
    boardCopy[i] = xIsNext ? "X" : "O";
    setGameBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  return (
    <div className="game-board-container">
      <TopSection toggleActiveStyle={toggleActiveStyle} toggleActive={toggleActive} reset={() => resetBoard(setGameBoard, setXisNext, winner)} />
      {!checkStalemate(gameBoard, winner) ? <p className="winner">{winner ? `${winner} won 🥳` : `Next: ${xIsNext ? "X" : "O"}`}</p> : ""}
      {checkStalemate(gameBoard, winner) ? <p className="winner">No one won</p> : ""}
      <Bottom checkStalemate={checkStalemate} gameBoard={gameBoard} xIsNext={xIsNext} onClick={onClick} />
      <Footer />
    </div>
  );
};

export default GameBoard;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSound from "use-sound";

// communication with backend
import axios from "axios";
import EndPoint from "../../Utils/Api"; // api endpoint
import io from "socket.io-client";

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
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const [activeState, changeActiveState] = useState({ activeObj: { id: 2 }, objects: [{ id: 1 }, { id: 2 }] });
  // sfxs
  const [writeSfx] = useSound(write);
  const [winSfx] = useSound(win);

  const { id } = useParams();
  const [uuid, setUUID] = useState(0);
  let winner = checkWinner(gameBoard, winSfx);

  const reset = () => {
    resetBoard(setGameBoard, setXisNext, winner);
  };

  const toggleActive = (i) => {
    changeActiveState({ ...activeState, activeObj: activeState.objects[i] });
  };
  const toggleActiveStyle = (i) => {
    if (activeState.objects[i].id === activeState.activeObj.id) return "active";
    return "inactive";
  };

  const onClick = (i) => {
    const boardCopy = [...gameBoard];
    if (winner || boardCopy[i]) return;
    writeSfx();
    boardCopy[i] = xIsNext ? "X" : "O";
    setGameBoard(boardCopy);
    setXisNext(!xIsNext);
  };

  // Generate Link
  const generateLink = (e) => {
    return navigator.clipboard.writeText(`http://localhost:3000/${uuid === 0 ? "404" : uuid}`);
  };

  // Get id for player
  useEffect(() => {
    axios.get(`${EndPoint}/api/room/createid`).then((res) => {
      // Set UUID only if ID params is empty
      if (id === undefined) return setUUID(res.data.uuid);
    });
  }, []);

  // Connect with room (test)
  const socket = io(EndPoint);
  useEffect(() => {
    // Don't join room when uuid is not set to anything
    if (uuid === null || uuid === 0) return;
    socket.emit("joinGameRoom", uuid);
  }, [uuid]);

  return (
    <div className="game-board-container">
      <TopSection generateLink={generateLink} toggleActiveStyle={toggleActiveStyle} toggleActive={toggleActive} reset={reset} />
      {!checkStalemate(gameBoard, winner) ? <p className="winner">{winner ? `${winner} won 🥳` : `Waiting for: ${xIsNext ? "X" : "O"}`}</p> : ""}
      {checkStalemate(gameBoard, winner) ? <p className="winner">No one won</p> : ""}
      <Bottom checkStalemate={checkStalemate} gameBoard={gameBoard} xIsNext={xIsNext} onClick={onClick} />
      <Footer />
    </div>
  );
};

export default GameBoard;

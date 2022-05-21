import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null)); // Game Board Array with null being empty spots
  const [xIsNext, setXisNext] = useState(true); // Returns whose turn is next true is x's false is o's

  // State for styling the button press
  const [activeState, changeActiveState] = useState({ activeObj: { id: 2 }, objects: [{ id: 1 }, { id: 2 }] });

  // sfxs
  const [writeSfx] = useSound(write);
  const [winSfx] = useSound(win);

  // IDs states
  const [uuid, setUUID] = useState(0);
  const { id } = useParams();
  const [waitingForPlayer, setWaitingForPlayer] = useState(false);

  // For redirection
  const navigate = useNavigate();

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
    if (winner || boardCopy[i]) return;
    writeSfx();
    boardCopy[i] = xIsNext ? "X" : "O";
    setGameBoard(boardCopy);
    setXisNext(!xIsNext);

    socket.emit("move", { id: id, board: gameBoard });
  };

  // Generate Link
  const generateLink = (e) => {
    if (uuid !== 0) navigate(`/${uuid}`);
    return navigator.clipboard.writeText(`http://localhost:3000/${uuid === 0 ? "404" : uuid}`);
  };

  // Get id for player
  useEffect(() => {
    axios.get(`${EndPoint}/api/room/createid`).then((res) => {
      // Set UUID only if ID params is empty
      if (id === undefined) return setUUID(res.data.uuid);
    });
    // eslint-disable-next-line
  }, []);

  // user join effect
  useEffect(() => {
    if (id !== undefined) return setWaitingForPlayer(true);
    socket.on("join", (data) => {
      setWaitingForPlayer(true);
    });
  }, [id]);

  // Connect with room (test)
  const socket = io(EndPoint);
  useEffect(() => {
    // Don't join room when uuid is not set to anything
    if (id === undefined) return;
    socket.emit("joinGameRoom", { id: id, board: gameBoard });
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    socket.on("sex", (data) => {
      console.log("Moved was made");
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="game-board-container">
      <TopSection generateLink={generateLink} toggleActiveStyle={toggleActiveStyle} toggleActive={toggleActive} reset={() => resetBoard(setGameBoard, setXisNext, winner)} />
      {!waitingForPlayer ? "" : <p> Waiting for other player to join...</p>}
      {!checkStalemate(gameBoard, winner) ? <p className="winner">{winner ? `${winner} won 🥳` : `Next: ${xIsNext ? "X" : "O"}`}</p> : ""}
      {checkStalemate(gameBoard, winner) ? <p className="winner">No one won</p> : ""}
      <Bottom checkStalemate={checkStalemate} gameBoard={gameBoard} xIsNext={xIsNext} onClick={onClick} />
      <Footer />
    </div>
  );
};

export default GameBoard;

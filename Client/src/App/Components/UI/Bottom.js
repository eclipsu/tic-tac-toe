import React from "react";
import Cell from "../Board/Cell";

const Bottom = (props) => {
  return (
    <div className="bottom-section">
      <div className="board">
        {props.gameBoard.map((cell, i) => {
          return <Cell index={i} key={i} value={cell} onClick={() => props.onClick(i)} />;
        })}
      </div>
    </div>
  );
};

export default Bottom;

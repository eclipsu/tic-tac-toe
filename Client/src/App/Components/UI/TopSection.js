import React from "react";
const TopSection = (props) => {
  return (
    <div className="top-section">
      <h1>Tic Tac Toe</h1>

      <div className="buttons">
        <button
          value="2p"
          className={`${props.toggleActiveStyle(0)} vs_p`}
          onClick={() => {
            props.generateLink();
            props.toggleActive(0);
          }}
        >
          <span>2 Players</span>
        </button>
        <button
          value="1p"
          className={`${props.toggleActiveStyle(1)} vs_c`}
          onClick={() => {
            props.toggleActive(1);
          }}
        >
          Vs Computer
        </button>
      </div>
      <button className="new-game" onClick={props.reset}>
        New Game
      </button>
    </div>
  );
};

export default TopSection;

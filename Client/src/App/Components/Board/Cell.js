import React from "react";
import "../../Styles/Board/Board.css";
import "../../Styles/Board/Cell.css";
const Square = (props) => {
  return (
    <button className={`square${props.index} square`} onClick={props.onClick}>
      {typeof props.value === "number" ? "" : props.value}
    </button>
  );
};

export default Square;

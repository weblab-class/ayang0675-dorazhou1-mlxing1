import React from "react";
//import "../utilities.css";
import "./Game.css";
import Board from "../board/board";

const Game = () => {
  return (
    <div className="game">
      <Board />
      <div className="piece-br"></div>
    </div>
  );
};

export default Game;

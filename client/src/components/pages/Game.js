import React from "react";
import { useReducer } from "react";
//import "../utilities.css";
import "./Game.css";
import Board from "../board/board";
import AppContext from "../context/context"
import { initGameState } from "../constant";
import { reducer } from "../reducer/reducer";

const Game = () => {
  const [appState, dispatch] = useReducer(reducer, initGameState)
  const providerState = {
    appState,
    dispatch
  }
  //console.log(providerState)
  return (
    <AppContext.Provider value = {providerState}>
      <div className="game">
        <Board />
      </div>
    </AppContext.Provider>
  );
}

export default Game;

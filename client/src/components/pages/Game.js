import React from "react";
import { useReducer } from "react";
//import "../utilities.css";
import "./Game.css";
import Board from "../board/board";
import AppContext from "../context/context"
import { initGameState } from "../constant";
import { reducer } from "../reducer/reducer";
import { useSearchParams } from "react-router-dom";
import gameSocket from "../../game-socket";

const Game = () => {
  const [appState, dispatch] = useReducer(reducer, initGameState)
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(appState)
  const room = searchParams.get("room");
  console.log("room: "+room)
  gameSocket.joinRoom(room)

  const sendMove = (move) => {
    console.log("here: "+move)
    gameSocket.sendNextMove(room, move)
  }

  const providerState = {
    appState,
    dispatch
  }
  //console.log(providerState)
  return (
    <AppContext.Provider value = {providerState}>
      
    <button onClick={() => sendMove("test message")} className="theme-btn">test</button>
      <div className="game">
        <Board />
      </div>
    </AppContext.Provider>
  );
}

export default Game;

import React, { useEffect } from "react";
import { useReducer } from "react";
//import "../utilities.css";
import "./Game.css";
import Board from "../board/board";
import AppContext, { useAppContext } from "../context/context"
import { initGameState } from "../constant";
import { reducer } from "../reducer/reducer";
import { useSearchParams } from "react-router-dom";
import gameSocket from "../../game-socket";
import { socket } from "../../client-socket.js";
import { endUpdate, newMove, updateBoard } from "../reducer/actions/move";
import { checkArrays } from "../helper.js";
import Controls from "../modules/controls.js"

const Game = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const room = searchParams.get("room");
  console.log("room: "+room)
  useEffect(() => {
    gameSocket.joinRoom(room);
  },[]);
  initGameState.room = room;
  
  const [appState, dispatch] = useReducer(reducer, initGameState)
  console.log(appState)

  socket.off('nextMove')
  socket.on('nextMove', (move) => {
    /*if(!checkArrays(appState.position[appState.position.length-1], move.position)) {
      dispatch(newMove({newPosition:move.position,newEntangled:move.entangled}))
    }*/
    if(appState.side==move.side)dispatch(updateBoard(move))
  });

  socket.off('incomingBoard')
  socket.on('incomingBoard', (board) => {
    console.log("INCOMINGGG")
    console.log(board)
    dispatch(updateBoard(board))
  })

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
      <div className="controls">
        <Controls />
      </div>
    </AppContext.Provider>
  );
}

export default Game;

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
import { newMove, updateBoard } from "../reducer/actions/move";
import { checkArrays } from "../helper.js";

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
  socket.on("connect", () => {
    socket.off('newPlayer')
    socket.on('newPlayer', (socketid) => {
      if(socketid != socket.id) {
        console.log("new player detected")
        gameSocket.updateBoard({...appState, side: appState.side='w'?'b':'w'}, socketid)
      }
    })
  });

  socket.off('incomingBoard')
  socket.on('incomingBoard', (board) => {
    console.log("INCOMINGGG")
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
    </AppContext.Provider>
  );
}

export default Game;

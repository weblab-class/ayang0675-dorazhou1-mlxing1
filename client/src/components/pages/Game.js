import React, { useEffect, useState } from "react";
import { useReducer } from "react";
//import "../utilities.css";
import "./Game.css";
import Board from "../board/board";
import AppContext, { useAppContext } from "../context/context"
import { initGameState } from "../constant";
import { reducer } from "../reducer/reducer";
import { useSearchParams } from "react-router-dom";
import gameSocket from "../../game-socket";
import { endUpdate, newMove, updateBoard } from "../reducer/actions/move";
import { checkArrays } from "../helper.js";
import Controls from "../modules/controls.js"



const Game = ({ socket, wins, losses }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const room = searchParams.get("room");
  console.log("room: " + room)
  useEffect(() => {
    gameSocket.joinRoom(room);
  }, []);
  initGameState.room = room;

  const [appState, dispatch] = useReducer(reducer, initGameState)
  const [side, setSide] = useState(appState.side);
  console.log("refresh"+side)
  console.log(appState)

  socket.off('nextMove')
  socket.on('nextMove', (move) => {
    /*if(!checkArrays(appState.position[appState.position.length-1], move.position)) {
      dispatch(newMove({newPosition:move.position,newEntangled:move.entangled}))
    }*/
    if (appState.side == move.side) dispatch(updateBoard(move))
  });

  socket.on("connect", () => {
    socket.off('newPlayer')
    socket.on('newPlayer', (socketid) => {
      console.log("received self")
      if (socketid != socket.id) {
        console.log("new player detected")
        console.log(appState.side)
        gameSocket.updateBoard({ position: appState.position, entangled: appState.entangled, turn: appState.turn, side: (appState.side == 'w' ? 'b' : 'w') }, socketid)
      }
    })
  });
  // console.log(socket)
  // socket.off('newPlayer')
  // socket.on('newPlayer', (socketid) => {
  //   console.log("received self")
  //   if (socketid != socket.id) {
  //     console.log("new player detected")
  //     console.log(appState.side)
  //     gameSocket.updateBoard({ position: appState.position, entangled: appState.entangled, turn: appState.turn, side: (appState.side == 'w' ? 'b' : 'w') }, socketid)
  //   }
  // })

  socket.off('incomingBoard')
  socket.on('incomingBoard', (board) => {
    console.log("INCOMINGGG")
    console.log(board)
    setSide(board.side)
    console.log('board'+board.side)
    dispatch(updateBoard(board))
    
    console.log(side)
  })

  const providerState = {
    appState,
    dispatch
  }
  //console.log(providerState)
  console.log(wins)
  return (
    <AppContext.Provider value={providerState}>
      <div className="gamepage">
        <div className="game">
          <Board room={room} socket={socket}/>
        </div>
        <div className="controls">
          <Controls socket={socket} side={side} wins={wins} losses={losses} room={room} />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Game;

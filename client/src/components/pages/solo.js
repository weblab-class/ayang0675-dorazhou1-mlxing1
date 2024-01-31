import "./solo.css"
import React, { useEffect } from "react";
import { useReducer } from "react";
//import "../utilities.css";
import Board from "../board/board";
import AppContext, { useAppContext } from "../context/context"
import { initGameState } from "../constant";
import { reducer } from "../reducer/reducer";

const Solo = () => {
    const [appState, dispatch] = useReducer(reducer, {...initGameState(3), solo:1})
    console.log(appState)
  
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
  
  export default Solo;
  
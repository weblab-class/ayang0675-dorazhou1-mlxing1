import "./solo.css"
import React, { useEffect } from "react";
import { useReducer } from "react";
//import "../utilities.css";
import Board from "../board/board";
import AppContext, { useAppContext } from "../context/context"
import { initGameState } from "../constant";
import { reducer } from "../reducer/reducer";
import { Link } from "react-router-dom";

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
        <Link to="/">
          <div className="logo">
            <img src="logo.svg"/>
          </div>
        </Link>
        <div className="game-solo">
          <Board />
        </div>
      </AppContext.Provider>
    );
  }
  
  export default Solo;
  
import "./pieces.css"
import React from "react"
import Piece from './Piece.js'
import { useState,useRef,useEffect } from 'react';
import { createPosition,copyPosition,getEntangled } from '../../helper.js'
import { useAppContext } from "../../context/context.js";
import { clearCandidates, newMove } from "../../reducer/actions/move.js";
import arbiter from "../../arbiter/arbiter.js";
import gameSocket from "../../../game-socket.js";

const Pieces = () => {

    const ref=useRef()

    let {appState, dispatch} = useAppContext();
    const currentPosition = appState.position[appState.position.length-1]
    const currentEntangled = appState.entangled[appState.entangled.length-1]
    const findCoords = e=>{
       const {width,left,top} = ref.current.getBoundingClientRect()
        const size=width/8
        const y = Math.floor((e.clientX-left)/size)
        const x = 7- Math.floor((e.clientY-top)/size)
        return {x,y}
    }

    const move = e=>{
        const {x,y}=findCoords(e);
        console.log(x,y)
        const[piece,rank,file,entanglement] = e.dataTransfer.getData('text').split(',');
        if(appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
            const {newPosition,newEntangled}=arbiter.performMove({
                position: currentPosition,
                entangled: currentEntangled,
                entanglement,piece,rank,file,
                x,y
            })
            dispatch(newMove({newPosition,newEntangled}))
                
            const sendMove = (move) => {
                gameSocket.sendNextMove(appState.room, move)
            }
            console.log("sendmove")
            sendMove({position: newPosition, entangled: newEntangled})
        }
    }
    const onDrop = e=>{
        e.preventDefault()
        //console.log(ref.current.getBoundingClientRect())
        move(e);
        dispatch(clearCandidates())
    }
    const onDragOver = e=>{
        e.preventDefault()
    }
    return <div className = 'pieces'
    ref={ref}
    onDrop={onDrop}
        onDragOver={onDragOver}
    >
        {currentPosition.map((r,rank) => r.map((f,file) => currentPosition[rank][file] ? 
        <Piece
        key = {rank + '-' + file}
        rank = {rank}
        file = {file}
        piece = {currentPosition[rank][file]}
        entanglement = {currentEntangled[rank][file]}/>
        : null))}
    </div>
}

export default Pieces
import "./pieces.css"
import React from "react"
import Piece from './Piece.js'
import { useState,useRef,useEffect } from 'react';
import { createPosition,copyPosition,getEntangled } from '../../helper.js'
import { useAppContext } from "../../context/context.js";
import { changeMove, clearCandidates, newMove } from "../../reducer/actions/move.js";
import arbiter from "../../arbiter/arbiter.js";
import gameSocket from "../../../game-socket.js";
import { openPromotion } from "../../reducer/actions/popup.js";
import { getCastleDirections } from "../../arbiter/getMoves.js";
import { updateCastling } from "../../reducer/actions/game.js";
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
    const openPromotionBox = ({rank,file,x,y}) =>{
        dispatch(openPromotion({rank : Number(rank),file: Number(file),x,y}))
    }
    const updateCastlingState = ({piece,rank,file}) => {
        const direction = getCastleDirections({
            castleDirection: appState.castleDirection,
            piece,rank,file
        })
        if(direction){
            dispatch(updateCastling({direction}))
        }
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
            if(piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingState({piece,rank,file})
            }
            dispatch(newMove({newPosition,newEntangled}))
            
            if((piece === 'wp' && x === 7) || (piece ==='bp' && x === 0)){
                openPromotionBox({x,y})
                return
            }
            dispatch(changeMove())
            const sendMove = (move) => {
                gameSocket.sendNextMove(appState.room, move)
            }
            console.log("sendmove")
            sendMove({position: [...appState.position,newPosition], entangled: [...appState.entangled,newEntangled], turn: (appState.turn=='w'?'b':'w'),side: (appState.side=='w'?'b':'w')})
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
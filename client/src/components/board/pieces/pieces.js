import "./pieces.css"
import React from "react"
import Piece from './Piece.js'
import { useState,useRef,useEffect } from 'react';
import { createPosition,copyPosition,getEntangled } from '../../helper.js'
import { useAppContext } from "../../context/context.js";
import { clearCandidates, newMove } from "../../reducer/actions/move.js";

const Pieces = () => {

    const ref=useRef()

    const {appState, dispatch} = useAppContext();
    const currentPosition = appState.position[appState.position.length-1]
    const currentEntangled = appState.entangled[appState.entangled.length-1]
    const findCoords = e=>{
       const {width,left,top} = ref.current.getBoundingClientRect()
        const size=width/8
        const y = Math.floor((e.clientX-left)/size)
        const x = 7- Math.floor((e.clientY-top)/size)
        return {x,y}
    }
    const onDrop = e=>{
        //console.log(ref.current.getBoundingClientRect())

        const newPosition=copyPosition(currentPosition)
        const {x,y}=findCoords(e);
        const[p,rank,file,entanglement] = e.dataTransfer.getData('text').split(',');

        if(appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
            if (p.endsWith('p') && newPosition[x][y] === '' && x!==rank && y!==file)
                newPosition[rank][y]=''
            newPosition[rank][file]=''
            newPosition[x][y]=p
            const newEntangled = copyPosition(currentEntangled)
            newEntangled[rank][file]=''
            newEntangled[x][y]=entanglement
            dispatch(newMove({newPosition,newEntangled}))
        }

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
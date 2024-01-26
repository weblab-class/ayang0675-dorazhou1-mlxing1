import "./pieces.css"
import React from "react"
import Piece from './Piece.js'
import { useState,useRef,useEffect } from 'react';
import { createPosition,copyPosition,getEntangled } from '../../helper.js'
import ReactDOM from "react-dom/client";

const Pieces = () => {
    const ref=useRef()
    console.log(useRef().current)
    const[state,setState] = useState(createPosition());
    const[entangled, setEntangled] = useState(getEntangled());
    const findCoords = e=>{
        console.log(ref.current.getBoundingClientRect())
       const {width,left,top} = ref.current.getBoundingClientRect()
        const size=width/8
        const y = Math.floor((e.clientX-left)/size)
        const x = 7- Math.floor((e.clientY-top)/size)
        return {x,y}
    }
    const onDrop = e=>{
        //console.log(ref.current.getBoundingClientRect())

        const newPosition=copyPosition(state)
        const {x,y}=findCoords(e);
        const[p,rank,file,entanglement] = e.dataTransfer.getData('text').split(',');
        newPosition[rank][file]=''
        newPosition[x][y]=p
        setState(newPosition)
        const newEntangled = copyPosition(entangled)
        newEntangled[rank][file]=''
        newEntangled[x][y]=entanglement
        setEntangled(newEntangled)
    }
    const onDragOver = e=>{
        e.preventDefault()
    }
    
    return <div className = 'pieces'
    ref={ref}
    onDrop={onDrop}
        onDragOver={onDragOver}
    >
        {state.map((r,rank) => r.map((f,file) => state[rank][file] ? 
        <Piece
        key = {rank + '-' + file}
        rank = {rank}
        file = {file}
        piece = {state[rank][file]}
        entanglement = {entangled[rank][file]}/>
        : null))}
    </div>
}

export default Pieces
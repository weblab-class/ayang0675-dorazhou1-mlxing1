import './board.css'
import React from 'react'
import { ToRow } from '../helper'
import Files from './bits/files'
import Ranks from './bits/ranks'
const getClass = (i,j) =>{
    return((i+j)%2===0?'tile--light':'tile--dark')
} 
const Board = () => {
    const ranks =Array(8).fill().map((x,i) =>8-i)
    const files = Array(8).fill().map((x,i) => ToRow(i))
   return <div className = "board">

        <Ranks ranks = {ranks}/>
        <div className="tiles">
            {ranks.map((rank,i) => 
                files.map((file,j)=>
                    <div key = {rank + '-' + file} className = {getClass(i,j)}></div>
            
                )
            )}
        </div>
        <Files files={files}/>
    </div>
}

export default Board
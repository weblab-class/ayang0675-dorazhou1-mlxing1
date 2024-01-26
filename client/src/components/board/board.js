import './board.css'
import React from 'react'
import Files from './bits/files'
import Ranks from './bits/ranks'
import Pieces from './pieces/pieces'
const getClass = (i,j) =>{
    return((i+j)%2===0?'tile--light':'tile--dark')
}
const Board = () => {
    const ranks =Array(8).fill().map((x,i) =>8-i)
    const files = Array(8).fill().map((x,i) => i+1)
   return <div className = "board">

        <Ranks ranks = {ranks}/>
        <div className="tiles">
            {ranks.map((rank,i) => 
                files.map((file,j)=>
                    <div key = {rank + '-' + file} className = {getClass(i,j)}></div>
            
                )
            )}
        </div>
        <Pieces/>
        <Files files={files}/>
    </div>
}

export default Board
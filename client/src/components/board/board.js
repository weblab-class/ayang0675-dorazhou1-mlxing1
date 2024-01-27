import './board.css'
import React from 'react'
import Files from './bits/files'
import Ranks from './bits/ranks'
import Pieces from './pieces/pieces'
import { useAppContext } from '../context/context'

const Board = () => {
    const ranks =Array(8).fill().map((x,i) =>8-i)
    const files = Array(8).fill().map((x,i) => i+1)

    const {appState} = useAppContext()
    const position = appState.position[appState.position.length-1]
    const getClass = (i,j) =>{
        let c=(i+j)%2===0?'tile--light':'tile--dark'
        if(appState.candidateMoves?.find(m => m[0] === i && m[1] === j)){
            if(position[i][j])c+=' attacking'
            else c+=' empty'
        }
        return c
    }


   return <div className = "board">

        <Ranks ranks = {ranks}/>
        <div className="tiles">
            {ranks.map((rank,i) => 
                files.map((file,j)=>
                    <div key = {rank + '-' + file} className = {getClass(7-i,j)}></div>
            
                )
            )}
        </div>
        <Pieces/>
        <Files files={files}/>
    </div>
}

export default Board
import './board.css'
import React from 'react'
import Files from './bits/files'
import Ranks from './bits/ranks'
import Pieces from './pieces/pieces'
import { useAppContext } from '../context/context'
import Popup from './popup/popup'
const Board = () => {
    const {appState} = useAppContext()

    const ranks =appState.side=='w'? Array(8).fill().map((x,i) =>8-i) : Array(8).fill().map((x,i) =>i+1)
    const files = appState.side=='w'? Array(8).fill().map((x,i) => i+1) : Array(8).fill().map((x,i) => 8-i)

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
                    <div key = {rank + '-' + file} className = {appState.side=='w'?getClass(7-i,j):getClass(i,7-j)}></div>
            
                )
            )}
        </div>
        <Pieces/>
        <Popup/>
        <Files files={files}/>
    </div>
}

export default Board
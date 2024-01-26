import "./pieces.css"
import React from "react"
import Piece from './Piece.js'
const Pieces = () => {
    const position = new Array(8).fill('').map(x=>new Array(8).fill(''))
    position[0][0]='wr'; 
    position[0][1]='wh';
    position[0][2]='wb';
    position[0][3]='wq';
    position[0][4]='wk';
    position[0][5]='wb';
    position[0][6]='wh';
    position[0][7]='wr';
    position[1][0]='wp';
    position[1][1]='wp';
    position[1][2]='wp';
    position[1][3]='wp';
    position[1][4]='wp';
    position[1][5]='wp';
    position[1][6]='wp';
    position[1][7]='wp';

    position[7][7]='br';
    position[7][6]='bh';
    position[7][5]='bb';
    position[7][4]='bk';
    position[7][3]='bq';
    position[7][2]='bb';
    position[7][1]='bh';
    position[7][0]='br';
    position[6][7]='bp';
    position[6][6]='bp';
    position[6][5]='bp';
    position[6][4]='bp';
    position[6][3]='bp';
    position[6][2]='bp';
    position[6][1]='bp';
    position[6][0]='bp';

    console.log(position);
    
    return <div className = 'pieces'>
        {position.map((r,rank) => r.map((f,file) => position[rank][file] ? 
        <Piece
        key = {rank + '-' + file}
        rank = {rank}
        file = {file}
        piece = {position[rank][file]}/>
        : null))}
    </div>
}

export default Pieces
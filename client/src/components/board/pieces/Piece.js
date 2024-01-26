import React from "react"
const Piece = ({rank,file,piece}) =>{
    return (<div className = {`piece ${piece} p-${rank}${file}`} draggable={true}>
    </div>)
}
export default Piece
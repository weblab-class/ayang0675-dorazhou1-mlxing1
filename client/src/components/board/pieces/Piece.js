import React from "react"

const Piece = ({rank,file,piece,entangled}) =>{
    return (<div className = {`piece ${piece} p-${rank}${file}`} draggable={true}><img className={`piece-img  ${entangled}`} src={`pieces/${piece}.svg`} />
    </div>)
}
export default Piece
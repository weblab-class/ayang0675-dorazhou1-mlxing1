import React from "react"

const Piece = ({rank,file,piece,entanglement}) =>{
    const onDragStart  = e=>{
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file},${entanglement}`)
        setTimeout(()=>{
        e.target.style.display='none'
        },0)
    }
    return (
        <div
        className = {`piece ${piece} p-${rank}${file}`} 
        draggable={true} 
        onDragStart = {onDragStart}
        >
        <img className={`piece-img  ${entanglement}`} src={`pieces/${piece}.svg`} />
        </div>
    )

}
export default Piece
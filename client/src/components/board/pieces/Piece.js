import React from "react"
import { useAppContext } from "../../context/context"
import arbiter from "../../arbiter/arbiter"
import { clearCandidates, generateCandidateMoves } from "../../reducer/actions/move"
const Piece = ({rank,file,piece,entanglement}) =>{

    const {appState,dispatch} = useAppContext()
    const {turn, position} = appState
    const onDragStart  = e=>{
        //console.log(previousPosition)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', `${piece},${rank},${file},${entanglement}`)
        setTimeout(()=>{
        e.target.style.display='none'
        },0)
        if(turn === piece[0] && (turn === appState.side || appState.solo==1)){
            const candidateMoves = arbiter.getRegularMoves({position:position[position.length-1],prevPosition:position[position.length-2], piece,rank,file})
            dispatch(generateCandidateMoves({candidateMoves}))
        }
    }
    const onDragEnd = e=>{
        e.target.style.display='block'
        dispatch(clearCandidates())
    }
    return (
        <div
        className = {`piece ${piece} p-${rank}${file}`} 
        draggable={true} 
        onDragEnd={onDragEnd}
        onDragStart = {onDragStart}
        
        ><img className={`piece-img  ${entanglement}`} src={`pieces/${piece}.svg`} />
        </div>
    )

}
export default Piece
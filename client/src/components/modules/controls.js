import React from "react"
import { useAppContext } from "../context/context"

const Resign = () => {
    return (
        <button
        className = "resign theme-btn"><i class="fa-solid fa-flag"></i>
        </button>
    )
}

const Controls = ({rank,file,piece,entanglement}) =>{

    const {appState,dispatch} = useAppContext()
    const {turn, position,castleDirection,entangled} = appState
    
    

}
export default Controls
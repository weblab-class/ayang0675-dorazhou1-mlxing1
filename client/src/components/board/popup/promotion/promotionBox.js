import gameSocket from '../../../../game-socket';
import { useAppContext } from '../../../context/context';
import { copyPosition } from '../../../helper';
import { changeMove, clearCandidates, newMove } from '../../../reducer/actions/move';
import './promotionBox.css'
import React from 'react'

const PromotionBox = ({onClosePopup}) => {
    let {appState,dispatch} = useAppContext();
    const options = ['q','r','b','h']
    const {promotionSquare} = appState
    if(!promotionSquare) return null
    const color = promotionSquare.x==7?'w':'b'
    const getPromotionBoxPosition = () => {
        const style = {}
        style.top = '-12.5%'
        if(promotionSquare.y<=1){
            style.left = '0%'
        }
        if(promotionSquare.y>=6){
            style.right='0%'
        }
        else style.left = `${12.5*promotionSquare.y-20}%`
        return style
    }
    const onClick = option => {
        onClosePopup()
        const newPosition = copyPosition(appState.position[appState.position.length-1])
        const newEntangled = copyPosition(appState.entangled[appState.entangled.length-1])
        newPosition[promotionSquare.x][promotionSquare.y] = color + option
        console.log(newPosition,newEntangled)
        dispatch(clearCandidates())
        dispatch(newMove({newPosition,newEntangled}))
        dispatch(changeMove())
        const sendMove = (move) => {
            gameSocket.sendNextMove(appState.room, move)
        }
        console.log("sendmove")
        sendMove({position: [...appState.position,newPosition], entangled: [...appState.entangled,newEntangled], turn: (appState.turn=='w'?'b':'w'),side: (appState.side=='w'?'b':'w')})
    }
    return <div className = "popup-inner promotion-choices" style = {getPromotionBoxPosition()}>
        {
            options.map(options => <div key = {options} className = {`piece ${color}${options}`}
            onClick= {() => onClick(options)}
            
            > 
            <img className='piece-img' src={`pieces/${color}${options}.svg`} /></div> )
        }
    </div>
}

export default PromotionBox
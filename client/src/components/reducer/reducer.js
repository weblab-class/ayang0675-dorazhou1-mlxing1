import actionTypes from "./actionTypes"


export const reducer = (state,action) =>{
    switch (action.type){
        case actionTypes.NEW_MOVE : {
            let {turn,position,entangled} =state
            turn = turn === 'w'?'b':'w'

            position=[
                ...position,
                action.payload.newPosition
            ]
            entangled=[
                ...entangled,
                action.payload.newEntangled
            ]
            return {
                ...state,
                turn,
                position,
                entangled
            }
        }
        default:
            return state
    }
}
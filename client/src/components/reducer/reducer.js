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
        case actionTypes.GENERATE_CANDIDATE_MOVES : {
            return{
                ...state,
                candidateMoves : action.payload.candidateMoves
            }
        }
        case actionTypes.CLEAR_CANDIDATE_MOVES : {
            return{
                ...state,
                candidateMoves : []
            }
        }
        default:
            return state
    }
}
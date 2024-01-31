import { Status } from "../constant"
import actionTypes from "./actionTypes"

export const reducer = (state,action) =>{
    switch (action.type){
        case actionTypes.NEW_MOVE : {
            let {position,entangled} =state

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
        case actionTypes.UPDATE_BOARD : {
            return{
                ...state,
                turn : action.payload.turn,
                position: action.payload.position,
                entangled: action.payload.entangled,
                side: action.payload.side,
            }
        }
        case actionTypes.OPEN_PROMOTION : {
            return{
                ...state,
                status:Status.promoting,
                promotionSquare: {...action.payload}
            }
        }
        case actionTypes.CLOSE_PROMOTION : {
            return{
                ...state,
                status:Status.ongoing,
                promotionSquare: null
            }
        }
        case actionTypes.CHANGE_MOVE :{
            return{
                ...state,
                turn: (state.turn =='w'?'b':'w'),
            }
        }
        case actionTypes.CAN_CASTLE :{

            let {turn, castleDirection} = state
            castleDirection[turn] = action.payload
            return{
                ...state,
                castleDirection
            }
        }
        default:
            return state
    }
}
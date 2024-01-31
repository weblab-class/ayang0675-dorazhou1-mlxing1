import actionTypes from "../actionTypes"
export const newMove = ({newPosition, newEntangled}) => {
    console.log(newPosition, newEntangled)
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition, newEntangled}
    }
}
export const generateCandidateMoves = ({candidateMoves}) =>{
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload:{candidateMoves},
    }
}
export const clearCandidates = ()=>{
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}
export const updateBoard = ({position,entangled,turn,side}) =>{
    return{
        type: actionTypes.UPDATE_BOARD,
        payload:{position,entangled,turn,side}
    }
}
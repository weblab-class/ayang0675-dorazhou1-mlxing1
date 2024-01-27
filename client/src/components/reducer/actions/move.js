import actionTypes from "../actionTypes"
export const newMove = ({newPosition, newEntangled}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition, newEntangled}
    }
}
export const generateCandidateMoves = ({candidateMoves}) =>{
    console.log(candidateMoves)
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload:{candidateMoves},
    }
}
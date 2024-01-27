import actionTypes from "../actionTypes"
export const newMove = ({newPosition, newEntangled}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition, newEntangled}
    }
}
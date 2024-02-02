import actionTypes from "../actionTypes"
export const updateCastling = ({direction}) =>{
    return{
        type: actionTypes.CAN_CASTLE,
        payload : direction
    }
}
export const addEntangled = ({numpairs}) => {
    return {
        type: actionTypes.ADD_ENTANGLE,
        payload: numpairs
    }
}
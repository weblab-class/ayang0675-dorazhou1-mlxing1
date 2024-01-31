import actionTypes from "../actionTypes"

export const openPromotion = ({x,y}) => {
    return{
        type: actionTypes.OPEN_PROMOTION,
        payload: {x,y}
    }
}
export const closePopup = () =>{
    return{
        type: actionTypes.CLOSE_PROMOTION,
    }
}
import { Status } from '../../constant.js'
import { useAppContext } from '../../context/context.js'
import { closePopup } from '../../reducer/actions/popup.js'
import './popup.css'
import PromotionBox from './promotion/promotionBox.js'
import React from 'react'
const Popup = () =>{
    const {appState, dispatch} = useAppContext()
    if(appState.status === Status.ongoing) return null
    const onClosePopup= () =>{
        dispatch(closePopup())
    }
    return (<div className = 'popup'>
        <PromotionBox onClosePopup={onClosePopup}/>

    </div>)
}

export default Popup
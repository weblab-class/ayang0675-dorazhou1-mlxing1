import React from "react"
import './files.css'
import { ToCol } from "../../helper.js"
import { useAppContext } from "../../context/context.js";

const Files = ({files}) =>{
    return <div className = "files">
        {files.map(file => <span key = {file}>{ToCol(file)}</span>)}
    </div>
}

export default Files
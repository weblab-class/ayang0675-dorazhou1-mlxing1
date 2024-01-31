import { copyPosition } from "../helper"

export const movePawn = ({position,entangled, entanglement, piece,rank,file,x,y}) => {
    const newPosition = copyPosition(position)
    const newEntangled = copyPosition(entangled)
    if(!newPosition[x][y] && x!== rank  && y!==file){
        newPosition[rank][y]=''
        newEntangled[rank][y]=''
    }

    newPosition[rank][file]=''
    newEntangled[rank][file] =''
    newPosition[x][y]=piece
    newEntangled[x][y]=entanglement

    return {newPosition,newEntangled}
}
export const movePiece = ({position,entangled, entanglement, piece,rank,file,x,y}) => {
    const newPosition = copyPosition(position)
    const newEntangled = copyPosition(entangled)

    newPosition[rank][file]=''
    newEntangled[rank][file] =''
    newPosition[x][y]=piece
    newEntangled[x][y]=entanglement
    return {newPosition, newEntangled}
}
import { getRookMoves,getPawnMoves,getKnightMoves,getKingMoves,getQueenMoves,getBishopMoves } from "./getMoves"
import { movePawn, movePiece } from "./move";
const arbiter = {
    getRegularMoves: function({position,castleDirection, prevPosition,piece,rank,file}){
        //console.log(prevPosition)
        switch(piece[1]){
            case 'r':
                return getRookMoves({position,piece,rank,file});
            case 'p':
                return getPawnMoves({position,prevPosition,piece,rank,file});
            case 'h':
                return getKnightMoves({position,piece,rank,file});
            case 'k':
                return getKingMoves({position,piece,rank,file,castleDirection});
            case 'q':
                return getQueenMoves({position,piece,rank,file});
            case 'b':
                return getBishopMoves({position,piece,rank,file});
            default:
                return getPawnMoves({position,prevPosition,piece,rank,file});
        }

        //return getRookMoves({position,piece,rank,file})
    },
    performMove: function({position,entanglement, entangled, piece,rank,file,x,y}){
        if(piece.endsWith('p')){
            return movePawn({position,entanglement,entangled, piece,rank,file,x,y})
        }
        else{
            return movePiece({position,entanglement,entangled, piece, rank, file, x, y})
        }
    }
}
export default arbiter
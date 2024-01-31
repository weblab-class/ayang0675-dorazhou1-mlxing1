import { getRookMoves,getPawnMoves,getKnightMoves,getKingMoves,getQueenMoves,getBishopMoves, getKingPosition, getPieces, getEnemyMoves } from "./getMoves"
import { movePawn, movePiece } from "./move";

const arbiter = {
    getMoves: function({position,castleDirection, prevPosition,piece,rank,file}){
        //console.log(prevPosition)

        switch(piece[1]){
            case 'r':
                return getRookMoves({position,piece,rank,file});
            case 'p':
                return getPawnMoves({position,prevPosition,piece,rank,file});
            case 'h':
                return getKnightMoves({position,piece,rank,file});
            case 'k':
                return getKingMoves({position,piece,rank,file,castleDirection,prevPosition});
            case 'q':
                return getQueenMoves({position,piece,rank,file});
            case 'b':
                return getBishopMoves({position,piece,rank,file});
            default:
                return getPawnMoves({position,prevPosition,piece,rank,file});
        }

        //return getRookMoves({position,piece,rank,file})
    },
    
    isPlayerInCheck: function({PositionAfterMove,position,player}){
        const enemy = player.startsWith('w')?'b':'w'
        let kingPos = getKingPosition(PositionAfterMove,player)
        const enemyMoves = getEnemyMoves({enemy,position:PositionAfterMove,prevPosition:position})
        if(enemyMoves.some(([x,y]) => kingPos[0] == x && kingPos[1] ==y))return true
        return false
    },
    getRegularMoves: function({position,castleDirection,entangled, prevPosition,piece,rank,file}){
        const moves = this.getMoves({position,castleDirection, prevPosition,piece,rank,file})
        let notInCheckMoves = []
        moves.forEach(([x,y]) => {
            const PositionAfterMove = this.performMove({position,entanglement:entangled[rank][file],entangled, piece,rank,file,x,y}).newPosition
            if(!this.isPlayerInCheck({PositionAfterMove, entangled, position, player: piece[0]})){
                notInCheckMoves.push([x,y])
            }
        })
        return notInCheckMoves
    },
    performMove: function({position,entanglement, entangled, piece,rank,file,x,y}){
        if(piece.endsWith('p')){
            return movePawn({position,entanglement,entangled, piece,rank,file,x,y})
        }
        else{
            return movePiece({position,entanglement,entangled, piece, rank, file, x, y})
        }
    },
}
export default arbiter
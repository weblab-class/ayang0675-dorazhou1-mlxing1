import { getRookMoves,getPawnMoves,getKnightMoves,getKingMoves,getQueenMoves,getBishopMoves } from "./getMoves"
const arbiter = {
    getRegularMoves: function({position,piece,rank,file}){
        //console.log(piece[1])
        switch(piece[1]){
            case 'r':
                return getRookMoves({position,piece,rank,file});
            case 'p':
                return getPawnMoves({position,piece,rank,file});
            case 'h':
                return getKnightMoves({position,piece,rank,file});
            case 'k':
                return getKingMoves({position,piece,rank,file});
            case 'q':
                return getQueenMoves({position,piece,rank,file});
            case 'b':
                return getBishopMoves({position,piece,rank,file});
            default:
                return getPawnMoves({position,piece,rank,file});
        }

        //return getRookMoves({position,piece,rank,file})
    }
}
export default arbiter
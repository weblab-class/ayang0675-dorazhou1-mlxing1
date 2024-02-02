import { createPosition,getEntangled } from "./helper";
export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'whote' : 'White wins',
    'black' : 'Black wins',
}
export const initGameState = {
    position: [createPosition()],
    // entangled: [getEntangled(3)],
    turn: 'w',
    candidateMoves: [],
    room: '',
    side: 'w',
    solo: 0,
    status: Status.ongoing,
    promotionSquare: null,
    castleDirection:{
        w: 'both',
        b: 'both',
    }
}
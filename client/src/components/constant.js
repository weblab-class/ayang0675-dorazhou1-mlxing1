import { createPosition,getEntangled } from "./helper";
export const initGameState = {
    position: [createPosition()],
    entangled: [getEntangled()],
    turn: 'w',
    candidateMoves: [],
    room: '',
    side: 'w',
    solo: 0,
}
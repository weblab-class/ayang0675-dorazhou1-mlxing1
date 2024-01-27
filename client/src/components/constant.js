import { createPosition,getEntangled } from "./helper";
export const initGameState = {
    position: [createPosition()],
    entangled: [getEntangled()],
    turn: 'w',
}
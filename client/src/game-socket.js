import { socket } from "./client-socket.js";
import { post } from "./utilities.js"

const sendNextMove = (room, move) => {
    post("/api/nextMove", {
        room: room, 
        move: move
    })
}

const joinRoom = (room) => {
    socket.emit("join", room);
};
// sends board out
const updateBoard = (board, socketid) => {
    console.log("newplayer post"+socketid)
    post("/api/updateBoard", {
        board: board, 
        socketid: socketid,
    })
}

export default {
    sendNextMove: sendNextMove,
    joinRoom: joinRoom,
    updateBoard: updateBoard,
}
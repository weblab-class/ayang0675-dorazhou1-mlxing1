import { socket } from "./client-socket.js";
import { post } from "./utilities.js"

const sendNextMove = (room, move) => {
    post("/api/nextMove", {
        room: room, 
        move: move
    })
}

socket.on('nextMove', (move) => {
    console.log(move)
});

const joinRoom = (room) => {
    socket.emit("join", room);
    console.log("joined room "+room)
};

export default {
    sendNextMove: sendNextMove,
    joinRoom: joinRoom,
}
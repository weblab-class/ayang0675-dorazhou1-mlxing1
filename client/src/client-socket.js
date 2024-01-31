import socketIOClient from "socket.io-client";
import { post } from "./utilities";
import { useEffect } from "react";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);
// useEffect(() => {
  socket.on("connect", () => {
    post("/api/initsocket", { socketid: socket.id });
  });
// },[]);
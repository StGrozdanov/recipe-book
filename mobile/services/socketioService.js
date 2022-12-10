import {SOCKET_URL} from "@env"

import socketIOClient from "socket.io-client";

const socket = socketIOClient(SOCKET_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 15
});

socket.connect(); 

export default socket;
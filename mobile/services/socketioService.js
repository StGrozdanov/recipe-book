import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://192.168.0.150:3030", {
    transports: ['websocket'],
    reconnectionAttempts: 15
});

socket.connect(); 

export default socket;
import socketIOClient from "socket.io-client";

const socket = socketIOClient("https://recepies-notifications-api.herokuapp.com/", {
    transports: ['websocket'],
    reconnectionAttempts: 15
});

socket.connect(); 

export default socket;
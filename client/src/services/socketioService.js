import { getCurrentUser } from "./userService.js";

export const socket = io("http://localhost:3030");

const currentUser = getCurrentUser();

currentUser ? socket.emit("newUser", currentUser) : '';
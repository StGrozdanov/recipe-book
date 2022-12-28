// export const socket = io("http://localhost:3030");
export const socket = io(process.env.REACT_APP_SOCKET_URL);
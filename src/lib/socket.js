import { io } from "socket.io-client";

let socket = null;

export const initializeSocket = () => {
    if (!socket) {
        socket = io(import.meta.env.VITE_BASE_URL ?? "http://localhost:5001", {
            credentials: true,
            transports: ['websocket', 'polling']
        });
    }
    return socket;
};

// Get the socket instance
export const getSocket = () => {
    return socket;
};

// Disconnect the socket
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
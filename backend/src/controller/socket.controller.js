import { handleLobbyEvents } from "../socket/lobby.socket.js";
import { handleGameEvents } from "../socket/game.socket.js";
import { asyncHandler } from "../utils/asyncHandler.js";

let io;

// Initialize socket connection handler
export const initializeSocketHandlers = (socketIO) => {
    io = socketIO;
    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        handleLobbyEvents(socket, io);

    });
};

export const getSocketIO = () => {
    return io;
};




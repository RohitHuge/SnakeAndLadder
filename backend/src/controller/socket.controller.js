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

        // Handle game room joining
        // socket.on("startGame", (data) => {
        //     handleGameEvents(socket, data);
        // });
    });
};

export const getSocketIO = () => {
    return io;
};




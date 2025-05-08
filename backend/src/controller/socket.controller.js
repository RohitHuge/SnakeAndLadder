import { getSocketIO } from "../socket/socketServer.js";
import { handleLobbyEvents } from "../socket/lobby.socket.js";

export const activateSocket = () => {
    const io = getSocketIO();

    io.on("connection", (socket) => {
        handleLobbyEvents(socket);
    });

    // io.on("disconnect", (socket) => {
    //     console.log("User disconnected", socket.id);
    // });
};

export const deactivateSocket = () => {
    const io = getSocketIO();
    io.removeAllListeners();
};
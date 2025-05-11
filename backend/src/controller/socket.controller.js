import { getSocketIO } from "../socket/socketServer.js";
import { handleLobbyEvents } from "../socket/lobby.socket.js";

export const activateSocket = async (req, res) => {
    try {
        const io = getSocketIO();

        io.on("connection", (socket) => {
            console.log("New client connected:", socket.id);
            handleLobbyEvents(socket);
        });

        // Send success response
        res.status(200).json({
            success: true,
            message: "Socket server activated successfully"
        });
    } catch (error) {
        console.error("Error activating socket:", error);
        res.status(500).json({
            success: false,
            message: "Failed to activate socket server"
        });
    }
};

export const deactivateSocket = async (req, res) => {
    try {
        const io = getSocketIO();
        io.removeAllListeners();
        
        res.status(200).json({
            success: true,
            message: "Socket server deactivated successfully"
        });
    } catch (error) {
        console.error("Error deactivating socket:", error);
        res.status(500).json({
            success: false,
            message: "Failed to deactivate socket server"
        });
    }
};
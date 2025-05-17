import GameRoom from "../models/gameRoom.models.js";
import { getSocketIO } from "../controller/socket.controller.js";

export const handleGameEvents = (socket, data) => {
    const io = getSocketIO();

    socket.on("exitGame", async () => {
        io.in(data.roomCode).emit("exitGame");
        await GameRoom.findOneAndDelete({ roomCode: data.roomCode });
        socket.leave(data.roomCode);
    });

};
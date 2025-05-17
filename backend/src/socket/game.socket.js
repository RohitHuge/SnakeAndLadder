import GameRoom from "../models/gameRoom.models.js";
import { User } from "../models/user.model.js";
import { getSocketIO } from "../controller/socket.controller.js";

export const handleGameEvents = async (socket, data) => {
    const io = getSocketIO();
    const gameRoom = await GameRoom.findOne({ roomCode: data.roomCode });
    gameRoom.turn = gameRoom.players[0].user;
    await gameRoom.save();
    const firstPlayer = await User.findById(gameRoom.turn);
    const P1 = gameRoom.players[0];
    const P2 = gameRoom.players[1];



    io.in(data.roomCode).emit("GameStatus",{
        type: "initiateGame",
        data: {
            turn: firstPlayer,
            P1position: P1.position,
            P2position: P2.position,
            
             }
    });

    socket.on("rollDice", async (data) => {
        const roll = Math.floor(Math.random() * 6) + 1;
        io.in(data.roomCode).emit("GameStatus", {
            type: "rollDice",
            data: {
                roll: roll
            }
        });
    });


    
    socket.on("exitGame", async () => {
        io.in(data.roomCode).emit("exitGame");
        await GameRoom.findOneAndDelete({ roomCode: data.roomCode });
        socket.leave(data.roomCode);
    });

};
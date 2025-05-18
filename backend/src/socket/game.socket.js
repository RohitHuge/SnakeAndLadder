import GameRoom from "../models/gameRoom.models.js";
import { User } from "../models/user.model.js";
import { getSocketIO } from "../controller/socket.controller.js";
import { movePlayer } from "../controller/game.controller.js";

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
        io.in(data.roomCode).emit("GameStatus", {
            type: "rollDice-start",
        });
        const gameRoom = await GameRoom.findOne({ roomCode: data.roomCode });
       
        const currentPlayer = gameRoom.players.find(player => player.username.toString() === data.currentPlayer);

        const roll = Math.floor(Math.random() * 6) + 1;

        const newPosition = await movePlayer(roll, currentPlayer.position);

        const nextPlayer = gameRoom.players.find(player => player.username.toString() !== data.currentPlayer);

        
        currentPlayer.position = newPosition;
        await gameRoom.save();

        const playerPosition = [gameRoom.players[0].position, gameRoom.players[1].position];

        setTimeout(() => {
            io.in(data.roomCode).emit("GameStatus", {
                type: "rollDice-end",
                data: {
                    roll,
                    newPosition,
                    nextPlayer,
                    playerPosition
                }
            });
            console.log(newPosition,playerPosition);
        }, 3000);
    });


    
    socket.on("exitGame", async () => {
        io.in(data.roomCode).emit("exitGame");
        await GameRoom.findOneAndDelete({ roomCode: data.roomCode });
        socket.leave(data.roomCode);
    });

};
import {asyncHandler} from "../utils/asyncHandler.js";
import GameRoom from "../models/gameRoom.models.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {nanoid} from "nanoid";
import { User } from "../models/user.model.js";

const createGameRoom = asyncHandler(async (req, res) => {
    try {
        const user = req.user;
        const roomCode = nanoid(6).toUpperCase();

        const gameRoom = await GameRoom.create({
            roomCode,
            players: [
                {
                  user: user._id,
                  position: 1,
                  avatar: user.avatar,
                  username: user.username,
                  color: "blue", // Default color for host
                },
              ],
            createdBy: user._id,
            turn: user._id,
        })
        await gameRoom.save();
       res.status(201).json(new ApiResponse(201, gameRoom, "Game room created successfully"));
        
    } catch (error) {
        console.log("Error in createGameRoom::controller", error, req.user.username)
        throw new ApiError(500, "Error in createGameRoom::controller");
    }
}
);

const joinGameRoom = asyncHandler(async (req, res) => {
    try {
        const { roomCode } = req.body;
        const user = req.user;

        const gameRoom = await GameRoom.findOne({ roomCode });

        if (!gameRoom) {
            res.status(404).json(new ApiResponse(404, null, "Game room not found"));
            return;
        }

        if (gameRoom.players.length >= 2) {
            res.status(400).json(new ApiResponse(400, null, "Game room is full"));
            return;
        }

        if (gameRoom.players.some(player => player.user.equals(user._id))) {
            res.status(400).json(new ApiResponse(400, null, "You are already in this game room"));
            return;
        }

        gameRoom.players.push({
            user: user._id,
            position: 1,
            avatar: user.avatar,
            username: user.username,
            color: "Red", //guest color
        });
        await gameRoom.save();

        res.status(200).json(new ApiResponse(200, gameRoom, "Joined game room successfully"));


    } catch (error) {
        console.log("Error in joinGameRoom::controller", error, req.user.username)
        throw new ApiError(500, "Error in joinGameRoom::controller");
    }
});

const deleteGameRoom = asyncHandler(async (req, res) => {
    try {
        const { roomCode } = req.body;
        if(!roomCode){
            throw new ApiError(400, "Room code is required");
        }
        const gameRoom = await GameRoom.findOne({ roomCode });
        if(gameRoom){
            await gameRoom.deleteOne();
        console.log("Game room deleted successfully");
        res.status(200).json(new ApiResponse(200, null, "Game room deleted successfully"));
        }
        else{
            res.status(200).json(new ApiResponse(200, null, "Game room deleted already"));
        }
        
    } catch (error) {
        console.log("Error in deleteGameRoom::controller", error, req.user.username)
        throw new ApiError(500, "Error in deleteGameRoom::controller");
    }
});

const leaveGameRoom = asyncHandler(async (req, res) => {
    try {
        const {roomCode, currentPlayer} = req.body;
        const gameRoom = await GameRoom.findOne({ roomCode });
        if (!gameRoom) {
            return res.status(404).json({ message: 'Game room not found' });
          }
      
          // Remove the player from the players array
          gameRoom.players = gameRoom.players.filter(
            player => player.user.toString() !== currentPlayer
          );
      
          // Additional cleanup logic
          if (gameRoom.turn && gameRoom.turn.toString() === currentPlayer) {
            gameRoom.turn = null; // Clear turn if it was this player's turn
          }
      
          // If no players left, delete the room
          if (gameRoom.players.length === 0) {
            await GameRoom.deleteOne({ roomCode });
            return res.status(200).json({ message: 'Last player left, room deleted' });
          }
      
          // If host left, assign new host (first remaining player)
          if (gameRoom.createdBy.toString() === currentPlayer) {
            gameRoom.createdBy = gameRoom.players[0].user;
          }
      
          // Update status if needed
          if (gameRoom.status === 'started' && gameRoom.players.length < 2) {
            gameRoom.status = 'finished';
            gameRoom.winner = gameRoom.players[0]?.user || null;
          }
      
          await gameRoom.save();
        
        
    } catch (error) {
        console.log("Error in leaveGameRoom :: controller", error);
        throw new ApiError(500, "Error in leaving the room::controller");
    }
});

export { createGameRoom , joinGameRoom, deleteGameRoom, leaveGameRoom};






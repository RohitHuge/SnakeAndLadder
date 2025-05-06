import {asyncHandler} from "../utils/asyncHandler.js";
import GameRoom from "../models/gameRoom.models.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import {nanoid} from "nanoid";

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
        
        console.log(gameRoom.roomCode);
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
})

export { createGameRoom , joinGameRoom};






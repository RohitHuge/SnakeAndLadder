import { Router } from "express";
import { createGameRoom, joinGameRoom, deleteGameRoom, startGame } from "../controller/game.controller.js";
import { verifyJWT } from "../middleware/auth.js";


const router = Router();

router.route("/create-room").post(verifyJWT, createGameRoom);
router.route("/join-room").post(verifyJWT, joinGameRoom);
router.route("/delete-room").post(verifyJWT, deleteGameRoom);
router.route("/start-game").post(verifyJWT, startGame);

export default router;

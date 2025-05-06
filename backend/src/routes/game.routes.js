import { Router } from "express";
import { createGameRoom, joinGameRoom } from "../controller/game.controller.js";
import { verifyJWT } from "../middleware/auth.js";


const router = Router();

router.route("/create-room").post(verifyJWT, createGameRoom);
router.route("/join-room").post(verifyJWT, joinGameRoom);

export default router;

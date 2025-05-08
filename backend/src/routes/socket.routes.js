import { Router } from "express";
import { activateSocket, deactivateSocket } from "../controller/socket.controller.js";

const router = Router();

router.route("/activate").post(activateSocket);
router.route("/deactivate").post(deactivateSocket);

export default router;
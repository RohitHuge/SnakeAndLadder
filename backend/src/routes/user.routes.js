import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.js";
import { loginUser, logoutUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.js";


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    registerUser
    )

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

export default router;
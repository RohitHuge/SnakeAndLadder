import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Client, Users} from "node-appwrite";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Please login to access this resource");
        }

        const jwt = authHeader.split(" ")[1];
        

        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
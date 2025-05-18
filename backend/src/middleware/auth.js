import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
      console.log("Cookies:", req.cookies);
      console.log("Headers:", req.headers);
      
      // Try to get token from cookie first
      let accessToken = req.cookies?.accessToken;
      
      // If no cookie, try Authorization header
      if (!accessToken) {
          const authHeader = req.headers["authorization"];
          if (authHeader) {
              accessToken = authHeader.replace("Bearer ", "");
          }
      }
  
      if(!accessToken) {
          console.log("No access token found in cookies or headers");
          throw new ApiError(401, "Please login to access this resource");
      }
  
      try {
          const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
          console.log("Decoded token:", decoded);
  
          if(!decoded) {
              throw new ApiError(401, "Invalid token");
          }
  
          const user = await User.findById(decoded._id);
          
          if(!user) {
              throw new ApiError(401, "User not found");
          }
  
          req.user = user;
          next();
      } catch (jwtError) {
          console.log("JWT verification error:", jwtError);
          throw new ApiError(401, "Invalid or expired token");
      }
  } catch (error) { 
      console.log("Auth middleware error:", error);
      throw new ApiError(401, error.message || "Authentication failed");
  }
});
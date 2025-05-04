import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";



export const verifyJWT = asyncHandler(async (req, _, next) => {
    
  try {
      const accessToken = req.cookies?.accessToken || req.headers(authorization).replace("Bearer ", "");
  
      if(!accessToken) {
          throw new ApiError(401, "Please login to access this resource 1");
      }
  
      const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
  
      if(!decoded) {
          throw new ApiError(401, "Please login to access this resource 2");
      }
  
      const user = await User.findById(decoded.id);
  
      if(!user) {
          throw new ApiError(401, "Please login to access this resource");
      }
  
      req.user = user;
  
      next();
  } catch (error) { 
    throw new ApiError(401, error.message || "Please login to access this resource");
    
  }
});
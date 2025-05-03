import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
    // Validate request body
    const { username, email, password} = req.body;
    // Check if all required fields are present
    if([username, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, "Username, email and password are required");
    }

    const existedUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existedUser) { 
        console.log(User.findOne({ username }));
        throw new ApiError(400, "User already exists");
    }
    /*
    const avatarUrl = req.files?.avatar?.[0]?.path
     if (!avatarUrl) {
        throw new ApiError(400, "Please upload an avatar");
    }
    const avatar = await uploadOnCloudinary(avatarUrl);
    if (!avatar) {
        throw new ApiError(500, "Failed to upload avatar");
    }
    */
    const user = await User.create({
         username,
         email,
         password, 
        // avatarUrl: avatar.url
    });
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
   
});

export { registerUser }
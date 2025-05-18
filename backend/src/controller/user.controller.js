import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User } from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"



const generateAcessAndRefreshToken = async (user) => {
    try {
        const accessToken = await user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Failed to generate access and refresh token");
    }
    
    
    
}

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
    
    const avatarUrl = req.files?.avatar?.[0]?.path
    let avatar;
    if (avatarUrl) {
        avatar = await uploadOnCloudinary(avatarUrl);
    }
    else {
        avatar = "";
    }


    const user = await User.create({
         username,
         email,
         password, 
         avatarUrl: avatar.url
    });
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )

   
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    if(!isPasswordValid) {
        throw new ApiError(400, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAcessAndRefreshToken(user);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        domain: 'onrender.com' // This will allow the cookie to work across subdomains
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "User logged in successfully")
        )
    
    

});

const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user;
    user.refreshToken = null;
    await user.save({validateBeforeSave: false});

    res.status(200)
    .clearCookie("accessToken").
    clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "User logged out successfully"));
    
    
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(200).json(new ApiResponse(200, user, "Current user fetched successfully"));
})


export { registerUser, loginUser, logoutUser, getCurrentUser }; 
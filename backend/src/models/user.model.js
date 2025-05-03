import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    avatarUrl: { type: String, default: "" },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: {
      incoming: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      outgoing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['online', 'offline', 'in-game'],
      default: 'offline'
    },
    isAdmin: { type: Boolean, default: false },
    refreshToken: { type: String, default: "" },
  }, { timestamps: true });
  


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.createAccessToken = function(){
    return jwt.sign({_id: this._id}, process.env.ACCESS_SECRET, {expiresIn: "1d"})
}

userSchema.methods.createRefreshToken = function(){
    return jwt.sign({_id: this._id}, process.env.REFRESH_SECRET, {expiresIn: "10d"})
  }





  export const User = mongoose.model('User', userSchema)

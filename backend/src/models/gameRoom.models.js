import mongoose from 'mongoose';

const gameRoomSchema = new mongoose.Schema({
    roomCode: { type: String, required: true, unique: true },
  
    players: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        position: { type: Number, default: 1 }, // Snake and Ladder board starts at 1
        avatar: String,
        username: String,
        color: String, // Optional: for displaying token colors
      },
    ],
  
    status: {
      type: String,
      enum: ["waiting", "started", "finished"],
      default: "waiting",
    },
  
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  
    turn: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Whose turn it is
  
    gameState: {
      diceRoll: { type: Number, default: null },
      lastMovedPlayer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      updatedAt: { type: Date, default: Date.now },
    },
  
  }, { timestamps: true });

const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

export default GameRoom;

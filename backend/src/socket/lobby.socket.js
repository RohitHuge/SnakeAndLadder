// import { getSocketIO } from "./socketServer.js";
import GameRoom from "../models/gameRoom.models.js";
import {User} from "../models/user.model.js";
import { handleGameEvents } from "./game.socket.js";
// Store room information

export const handleLobbyEvents = (socket, io) => {
    // const io = getSocketIO();

    // Store user info in socket for reference
    socket.on("setUserInfo", (userInfo) => {
        socket.userInfo = userInfo;
    });
    
    socket.on("createLobby", (roomCode, hostUser) => {
        console.log("createLobby", roomCode, hostUser);
        socket.join(roomCode);
        
        
    });
    
    socket.on("joinLobby", (roomCode, joiningUser) => {
        
        
        const getRoomInfo = async () => {
            const roomInfo = await GameRoom.findOne({ roomCode });
            const hostInfo = await User.findOne({ _id: roomInfo.createdBy });
        

       
            if (!roomInfo) {
                socket.emit("lobby-error", {
                    type: "room-not-found",
                    message: "Game room not found"
                });
                return;
            }

            socket.join(roomCode);
  
            socket.emit("lobby-update", {
                type: "host-info",
                payload: {
                    // id: roomInfo.createdBy._id,
                    username: hostInfo.username,
                    avatarUrl: hostInfo.avatarUrl,
                    isHost: true
                }
            });

            // Notify host about the joining user
            socket.to(roomCode).emit("lobby-update", {
                type: "user-joined",
                payload: {
                    username: joiningUser.username,
                    avatar: joiningUser.avatar,
                    isHost: false
                }
            });
        }

        getRoomInfo();

 
    });

    socket.on("leaveLobby", (roomCode,currentUser) => {
        socket.to(roomCode).emit("lobby-update", {
            type: "user-left"
        });
    });

    socket.on("startGame", (data) => {
        handleGameEvents(socket, data);
    });

};



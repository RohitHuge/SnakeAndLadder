// Store room information
const rooms = new Map();

export const handleLobbyEvents = (socket) => {
    
    socket.on("createLobby", (roomCode, hostUser) => {
        console.log("createLobby", roomCode);
        socket.join(roomCode);
        
        // Store host info in the room
        rooms.set(roomCode, {
            host: {
                username: hostUser.username,
                avatar: hostUser.avatar
            }
        });
    });
    
    
    socket.on("joinLobby", (roomCode, joiningUser) => {
        console.log("joinLobby", roomCode);
        socket.join(roomCode);

        // Get room info and send host info to the joining user
        const roomInfo = rooms.get(roomCode);
        if (roomInfo && roomInfo.host) {
            socket.emit("host-info", roomInfo.host);
        }

        // Notify others about the joining user
        socket.to(roomCode).emit("lobby-update", {
            type: "user-joined",
            payload: {
                username: joiningUser.username,
                avatar: joiningUser.avatar,
            },
        });
    });



    socket.on("leaveLobby", (roomCode,currentUser) => {
        socket.to(roomCode).emit("lobby-update", {
            type: "user-left",
            // payload: {
            //     username: socket.user.username,
            //     avatar: socket.user.avatar,
            // },
        });
        console.log("leaveLobby", roomCode);
        socket.leave(roomCode);

        // If host leaves, clean up the room
        const roomInfo = rooms.get(roomCode);
        if (roomInfo && roomInfo.host.username === currentUser.username) {
            rooms.delete(roomCode);
        }
    });


};



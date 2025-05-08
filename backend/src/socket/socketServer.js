import { Server } from "socket.io";

let io = null;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        },
        transports: ['websocket', 'polling'],
        allowedHeaders:['content-type', 'authorization'],
        allowEIO3: true
    });
    return io;
};

export const getSocketIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};

export const cleanupSocket = () => {
    if (io) {
        io.close();
        io = null;
    }
};

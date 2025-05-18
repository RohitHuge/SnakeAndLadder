import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { initializeSocketHandlers } from './controller/socket.controller.js';

const app = express();
const httpServer = createServer(app);

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173','https://snakeandladder.pages.dev/'], // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Initialize Socket.IO with CORS configuration
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173','https://snakeandladder.pages.dev/'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Initialize socket handlers
initializeSocketHandlers(io);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

//router imports 
import userRouter from "./routes/user.routes.js"
import gameRouter from "./routes/game.routes.js"

// router implementation
app.use("/api/v1/users", userRouter);
app.use("/api/v1/game", gameRouter);

export { app, httpServer, io };
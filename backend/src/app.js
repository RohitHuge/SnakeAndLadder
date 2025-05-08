import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { initSocket } from './socket/socketServer.js';

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  
app.use(express.static("public"))
app.use(cookieParser())



//router imports 

import userRouter from "./routes/user.routes.js"
import gameRouter from "./routes/game.routes.js"
import socketRouter from "./routes/socket.routes.js"

// router implementation

app.use("/api/v1/users", userRouter);
app.use("/api/v1/game", gameRouter);
app.use("/api/v1/socket", socketRouter);

export { app, httpServer, io };
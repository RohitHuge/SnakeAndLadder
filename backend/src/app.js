import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

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


// router implementation

app.use("/api/v1/users", userRouter);
app.use("/api/v1/game", gameRouter);


export { app };
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './db/index.js';

dotenv.config({
    path: './.env'
});

connectDB()
.then(() => {
    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
});
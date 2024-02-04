import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import questionRouter from './routes/question.route.js';
import performerRouter from './routes/performer.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to Mongo DB!")
    })
    .catch((err) => {
        console.log(err);
    });

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

const port = 3000;

app.listen(port, () => {
    console.log("Server is running!");
});

app.use("/api/auth", authRouter);
app.use("/api/question", questionRouter);
app.use("/api/performer", performerRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
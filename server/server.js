import * as dotenv from 'dotenv';
dotenv.config();

import { Server } from 'socket.io';
import http from 'http';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// middleware
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5100;
const server = http.createServer(app);

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://shukuma-app-client.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/exercises', exerciseRoutes);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/workouts', workoutRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

// error handler
app.use(errorHandlerMiddleware);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

try {
  await mongoose.connect(process.env.MONGO_URL);
  server.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
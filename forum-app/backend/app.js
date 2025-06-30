// import package
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import multer from 'multer';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

// import routers
import authRouter from './routers/authRtr.js';
import questionRouter from './routers/questionRtr.js'

dotenv.config();
const app = express();
const port = 3000;

// Setup multer untuk form-data
const upload = multer();

// middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(upload.none()); // Untuk form-data tanpa file
app.use(cookieParser());
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/question', questionRouter)
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({success: true, message: 'Message from backend!'});
})

// error handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})


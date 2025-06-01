// import package
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// import routers
import authRouter from './routers/authRtr.js';

dotenv.config();
const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

// routes
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})


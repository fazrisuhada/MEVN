import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
const port = 3000

// middleware
app.use(cors())

// endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Fazri Suhada'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})


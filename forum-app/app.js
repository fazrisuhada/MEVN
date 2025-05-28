import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
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


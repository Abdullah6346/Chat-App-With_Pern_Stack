import express from 'express'
import messageroute from './routes/message.route'
import dotenv from 'dotenv'
import authroute from './routes/auth.route'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket'
import cors from 'cors'

dotenv.config()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: [
    'https://chat-app-with-pern-stack-frontend.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authroute)
app.use('/api/messages', messageroute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

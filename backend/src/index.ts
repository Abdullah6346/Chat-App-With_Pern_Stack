import express from 'express'
import messageroute from './routes/message.route'
import dotenv from 'dotenv'
import authroute from './routes/auth.route'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket'
dotenv.config()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authroute)
app.use('/api/messages', messageroute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

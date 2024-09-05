import express from 'express'
import path from 'path'
import authroute from './routes/auth.route'
import messageroute from './routes/message.route'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket'
dotenv.config()
const __dirname = path.resolve()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authroute)
app.use('/api/messages', messageroute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

if(process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname, '/frontend/dist')))
 app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
 }) 
}
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

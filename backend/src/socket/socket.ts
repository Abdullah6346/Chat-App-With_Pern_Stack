import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})
export const getRecieverSocket = (receiver: string) => {
  return userSocketMap[receiver]
}
const userSocketMap: { [key: string]: string } = {}

io.on('connection', (socket) => {
  console.log('Socket connected: ', socket.id)
  const userId = socket.handshake.query.userId as string
  if (userId) userSocketMap[userId] = socket.id
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    console.log('Socket disconnected: ', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})
export { app, io, server }

import { Request, Response } from 'express'
import prisma from '../../db/prisma'
import { getRecieverSocket, io } from '../socket/socket'
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params

    const senderId = req.user?.id
    if (!senderId) {
      return res.status(401).json({ error: 'User not authenticated' })
    }
    let conversations = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    })

    if (!conversations) {
      conversations = await prisma.conversation.create({
        data: {
          participantsIds: {
            set: [senderId, receiverId],
          },
        },
      })
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversations.id,
      },
    })
    if (newMessage) {
      conversations = await prisma.conversation.update({
        where: {
          id: conversations.id,
        },
        data: {
          message: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      })
    }
    // Socket.io
    const receiverSocketId = getRecieverSocket(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }
    if (!newMessage) {
      return res.status(200).json([])
    }
    res.status(200).json(newMessage)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error in sending message' })
  }
}
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user?.id
    if (!senderId) {
      return res.status(401).json({ error: 'User not authenticated' })
    }
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        message: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!conversation) {
      return res.status(200).json([])
    }
    res.status(200).json(conversation.message)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error in getting messages' })
  }
}
export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user?.id
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    })
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error in getting users' })
  }
}

import { Request, Response } from 'express'
import prisma from '../../db/prisma'
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user.id
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
    }
    // Socket.io
    res.status(201).json({ message: 'Message Sent Successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import prisma from '../../db/prisma'
interface decodedToken extends JwtPayload {
  userId: string
}
declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string
      }
    }
  }
}
const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ error: 'Unauthorized - Token Not Provided ' })
    // }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as decodedToken

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: { id: true, fullName: true, profilePic: true, userName: true },
    })

    if (!user) {
      res.status(401).json({ error: 'User Not Found ' })
    }

    user ? (req.user = user) : null

    next()
  } catch (error: any) {
    console.log('Error in Protected Route', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
export default protectRoute

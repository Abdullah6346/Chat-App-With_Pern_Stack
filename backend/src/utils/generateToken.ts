import jwt from 'jsonwebtoken'
import { Response } from 'express'

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '15d',
  })
  console.log('Token being sent:', token)
  res.cookie('jwt', token, {
    maxAge: 60 * 60 * 24 * 15 * 1000, //in ms
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  })
}

export default generateToken

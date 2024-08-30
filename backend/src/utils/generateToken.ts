import jwt from 'jsonwebtoken'
import { Response } from 'express'

const generateToken = (userid: string, res: Response) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET!, {
    expiresIn: '15d',
  })
  res.cookie('jwt', token, {
    maxAge: 60 * 60 * 24 * 15 * 1000, //in ms
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development', //https
  })
}

export default generateToken
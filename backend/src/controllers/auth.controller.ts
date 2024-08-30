import { Request, Response } from 'express'
import prisma from '../../db/prisma'
import bycrptjs from 'bcryptjs'
import generateToken from '../utils/generateToken'
export const signup = async (req: Request, res: Response) => {
  try {
    const { userName, fullName, password, confirmPassword, gender } = req.body
    if (!userName || !fullName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: 'Please Fill All the Fields ' })
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords Do Not Match' })
    }
    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
    })
    if (user) {
      return res.status(400).json({ error: 'User Already Exists' })
    }

    const salt = await bycrptjs.genSalt(10)
    const hashedPassword = await bycrptjs.hash(password, salt)
    // Api i used https://avatar.iran.liara.run/public/boy?username
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

    const newUser = await prisma.user.create({
      data: {
        fullName,
        userName,
        gender,
        password: hashedPassword,
        profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
      },
    })
    if (newUser) {
      generateToken(newUser.id, res)
      return res.status(200).json({
        id: newUser.id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      })
    }
  } catch (error: any) {
    console.log('Error in signup Controller', error.message)
    return res.status(500).json({ error: 'Error in Creating User' })
  }
}
export const login = async (req: Request, res: Response) => {}
export const logout = async (req: Request, res: Response) => {}

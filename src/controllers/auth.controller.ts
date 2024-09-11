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
export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body
    const user = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    })
    if (!user) {
      res.status(400).json({ error: 'Invalid Username' })
    }

    const isPasswordCorrect =
      user && (await bycrptjs.compare(password, user.password))

    if (!isPasswordCorrect) {
      res.status(400).json({ error: 'Invalid Password' })
    }

    if (user && isPasswordCorrect) {
      generateToken(user.id, res)
      return res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        userName: user.userName,
        gender: user.gender,
        profilePic: user.profilePic,
      })
    } else {
      res.status(400).json({ error: 'Invalid Username or Password' })
    }
  } catch (error: any) {
    console.log('Error in Login Controller', error.message)
    return res.status(500).json({ error: 'Error in Loging User' })
  }
}
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('jwt')
    return res.status(200).json({ message: 'Logged Out Successfully' })
  } catch (error: any) {
    console.log('Error in Logout Controller', error.message)
    return res.status(500).json({ error: 'Error in Logging Out' })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User Not Found' })
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      gender: user.gender,
      profilePic: user.profilePic,
    })
  } catch (error: any) {
    console.log('Error in getMe Controller', error.message)
    res.status(200).json({ error: 'Error in getting user' })
  }
}

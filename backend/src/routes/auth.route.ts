import { Router } from 'express'
import { login, logout, signup, getMe } from '../controllers/auth.controller'
import protectRoute from '../middlewares/protect.Route'
const router = Router()
// api/auth/login
router.get('/me', protectRoute, getMe)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

export default router

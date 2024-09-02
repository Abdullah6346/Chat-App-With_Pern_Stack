import { Router } from 'express'
import protectRoute from '../middlewares/protect.Route'
import { sendMessage,getMessages } from '../controllers/message.controller'
const router = Router()
router.post('/send/:id', protectRoute, sendMessage)
router.post('/:id', protectRoute, getMessages)

export default router

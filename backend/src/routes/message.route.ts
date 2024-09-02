import { Router } from "express";
import protectRoute from "../middlewares/protect.Route";
import { sendMessage } from "../controllers/message.controller";
const router = Router();
router.get("/send/:id",protectRoute,sendMessage)

export default router;

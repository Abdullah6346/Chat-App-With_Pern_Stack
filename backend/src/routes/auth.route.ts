import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
const router = Router();
// api/auth/login
router.post("/signin", signup);
router.post("/login", login);

router.post("/logout", logout);

export default router;

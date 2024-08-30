import { Router } from "express";
const router = Router();
router.get("/conversations", (req, res) => {
  res.send("Hey ");
});

export default router;

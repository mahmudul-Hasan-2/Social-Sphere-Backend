import { Router } from "express";
import { toggleReaction } from "../controllers/reaction.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// রিঅ্যাকশন দেওয়া বা রিমুভ করার রুট (প্রোটেক্টেড)
router.post("/", authenticate, toggleReaction);

export default router;

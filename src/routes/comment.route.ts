import { Router } from "express";
import {
  createComment,
  getCommentsByPostId,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// নির্দিষ্ট পোস্টের কমেন্ট দেখার রুট (পাবলিক)
router.get("/post/:postId", getCommentsByPostId);

// নতুন কমেন্ট বা রিপ্লাই করার রুট (প্রোটেক্টেড)
router.post("/", authenticate, createComment);

export default router;

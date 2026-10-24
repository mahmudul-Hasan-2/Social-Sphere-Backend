import { Router } from "express";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/comment.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// নির্দিষ্ট পোস্টের কমেন্ট দেখার রুট (পাবলিক)
router.get("/post/:postId", getCommentsByPost);

// নতুন কমেন্ট বা রিপ্লাই করার রুট (প্রোটেক্টেড)
router.post("/", authenticate, createComment);

export default router;

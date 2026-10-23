import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getTrendingPosts,
  getPostById,
} from "../controllers/post.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", getAllPosts);
router.get("/trending", getTrendingPosts);
router.get("/:id", getPostById);
router.post("/create", authenticate, createPost);

export default router;

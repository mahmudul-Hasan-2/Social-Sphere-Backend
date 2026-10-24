import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import {
  createPostService,
  getAllPostsService,
  getTrendingPostsService,
  getPostByIdService,
} from "../services/post.service.js";

export const createPost = catchAsync(async (req: any, res: Response) => {
  const userId = req.user?.id; // Auth middleware theke ashbe
  const result = await createPostService(userId, req.body);
  res.status(201).json({
    success: true,
    message: "Post created successfully!",
    data: result,
  });
});

export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllPostsService(req.query);
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully!",
    data: result,
  });
});

export const getTrendingPosts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getTrendingPostsService();
    res.status(200).json({
      success: true,
      message: "Trending posts fetched successfully!",
      data: result,
    });
  },
);

export const getPostById = catchAsync(async (req: Request, res: Response) => {
  const result = await getPostByIdService(req?.params?.id as string);
  res.status(200).json({
    success: true,
    message: "Post details fetched successfully!",
    data: result,
  });
});

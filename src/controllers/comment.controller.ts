import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

// কমেন্ট তৈরি করা
export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { postId, content, parentId } = req.body;
    const userId = req.user?.id;

    if (!postId || !content) {
      return res.status(400).json({
        success: false,
        message: "Post ID and content are required.",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        text: content, // Prisma স্কিমা অনুযায়ী content কে text ফিল্ডে ম্যাপ করা হলো
        postId,
        authorId: userId,
        parentId: parentId || null,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create comment",
    });
  }
};

// কোনো নির্দিষ্ট পোস্টের সমস্ত কমেন্ট ফেচ করা
export const getCommentsByPost = async (req: AuthRequest, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId, parentId: null },
      include: {
        author: {
          select: { name: true, image: true },
        },
        replies: {
          include: {
            author: {
              select: { name: true, image: true },
            },
          },
          orderBy: { createdAt: "asc" }, // রিপ্লাইগুলো পুরানো থেকে নতুন ক্রমানুসারে সাজানো ভালো
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Prisma-র `text` ফিল্ডকে ফ্রন্টএন্ডের সুবিধার্থে `content`-এ রূপান্তর করে পাঠানো (অপশনাল কিন্তু কার্যকরী)
    const formattedComments = comments.map((comment) => ({
      ...comment,
      content: comment.text, // ফ্রন্টএন্ড যাতে `comment.content` দিয়ে পড়তে পারে
      replies: comment.replies.map((reply) => ({
        ...reply,
        content: reply.text,
      })),
    }));

    return res.status(200).json({
      success: true,
      data: formattedComments,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch comments",
    });
  }
};

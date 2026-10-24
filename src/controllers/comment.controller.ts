import { Response } from "express";
import prisma from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

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
        text: content, // Prisma স্কিমা অনুযায়ী content কে text ফিল্ডে ম্যাপ করা হলো
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
export const getCommentsByPostId = async (req: AuthRequest, res: Response) => {
  try {
    const postId = req.params.postId as string;

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
        parentId: null, // শীর্ষ স্তরের কমেন্টগুলো
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
        replies: {
          include: {
            author: {
              select: { name: true, image: true }, // রিপ্লাইয়ের সাথে লেখকের তথ্য
            },
          },
        },
      },
    });

    const formattedComments = comments.map((comment: any) => ({
      ...comment,
      replies: comment.replies
        ? comment.replies.map((reply: any) => ({
            id: reply.id,
            text: reply.text,
            createdAt: reply.createdAt,
            author: reply.author,
          }))
        : [],
    }));

    return res.status(200).json({
      success: true,
      data: formattedComments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching comments" });
  }
};

import { Response } from "express";
import prisma from "../config/prisma.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export const toggleReaction = async (req: AuthRequest, res: Response) => {
  try {
    const { postId, type } = req.body;
    const userId = req.user?.id;

    if (!postId) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required.",
      });
    }

    // চেক করা ইউজার অলরেডি এই পোস্টে রিঅ্যাকশন দিয়েছে কিনা
    const existingReaction = await prisma.reaction.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingReaction) {
      // যদি আগে থেকেই থাকে তবে রিমুভ (Unlike) করে দেওয়া
      await prisma.reaction.delete({
        where: { id: existingReaction.id },
      });

      return res.status(200).json({
        success: true,
        message: "Reaction removed successfully",
      });
    } else {
      // না থাকলে নতুন রিঅ্যাকশন ক্রিয়েট করা
      const reaction = await prisma.reaction.create({
        data: {
          postId,
          userId,
          type: type || "LIKE",
        },
      });

      return res.status(201).json({
        success: true,
        message: "Reaction added successfully",
        data: reaction,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process reaction",
    });
  }
};

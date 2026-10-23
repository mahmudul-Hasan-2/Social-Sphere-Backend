import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

// Add comment
router.post(
  "/:postId",
  authenticate,
  catchAsync(async (req: any, res: any) => {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.create({
      data: { content, postId, authorId: userId },
      include: { author: { select: { id: true, name: true } } },
    });

    res
      .status(201)
      .json({ success: true, message: "Comment added", data: comment });
  }),
);

export default router;

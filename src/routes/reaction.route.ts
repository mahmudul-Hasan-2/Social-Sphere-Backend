import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import prisma from "../config/prisma";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

// Toggle reaction (Like/Love)
router.post(
  "/:postId",
  authenticate,
  catchAsync(async (req: any, res: any) => {
    const { type } = req.body; // e.g., 'LIKE'
    const { postId } = req.params;
    const userId = req.user.id;

    const existing = await prisma.reaction.findFirst({
      where: { postId, authorId: userId },
    });

    if (existing) {
      await prisma.reaction.delete({ where: { id: existing.id } });
      return res
        .status(200)
        .json({ success: true, message: "Reaction removed" });
    }

    const reaction = await prisma.reaction.create({
      data: { type: type || "LIKE", postId, authorId: userId },
    });

    res
      .status(201)
      .json({ success: true, message: "Reaction added", data: reaction });
  }),
);

export default router;

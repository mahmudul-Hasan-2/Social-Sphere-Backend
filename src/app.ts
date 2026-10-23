import express, { Application, Request, Response } from "express";
import cors from "cors";

// সঠিক relative path দিয়ে import করুন
import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import reactionRoutes from "./routes/reaction.route";

import { globalErrorHandler } from "./middlewares/error.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes Mapping
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/reactions", reactionRoutes);

// Base Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SocialSphere API is up and running smoothly!",
  });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;

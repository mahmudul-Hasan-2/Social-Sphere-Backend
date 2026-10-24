import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import commentRoutes from "./routes/comment.route";
import reactionRoutes from "./routes/reaction.route";

import { globalErrorHandler } from "./middlewares/error.middleware";

const app: Application = express();

// CORS কনফিগারেশন আপডেট করুন যাতে ক্রেডেনশিয়াল ও স্পেসিফিক অরিজিন এলাও থাকে
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // কুকি ও সেশন পাস করার জন্য এটি বাধ্যতামূলক
  }),
);

app.use(express.json());

// Routes Mapping
app.use("/api/auth", authRoutes); // Better Auth ডিফল্টভাবে /api/auth রুট ব্যবহার করে
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

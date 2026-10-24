import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../utils/auth";

export interface AuthRequest extends Request {
  user?: any;
  session?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Better Auth থেকে রিকোয়েস্ট হেডার্স ও কুকি ভ্যালিড করা
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please log in first.",
      });
    }

    // ইউজার ও সেশন ডেটা রিকোয়েস্টে এটাচ করে দেওয়া
    req.user = session.user;
    req.session = session.session;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
};

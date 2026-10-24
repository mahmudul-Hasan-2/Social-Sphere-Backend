import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../utils/auth.js";

const router = Router();

// Express 5 এর জন্য রেগুলার এক্সপ্রেশন ওয়াইল্ডকার্ড ব্যবহার করা হলো
router.all(/(.*)/, toNodeHandler(auth));

export default router;

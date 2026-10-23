import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../utils/auth";

const router = Router();

// Better Auth সব রুট (register, login, session, google-oauth etc.) স্বয়ংক্রিয়ভাবে হ্যান্ডেল করে
router.all("/*", toNodeHandler(auth));

export default router;

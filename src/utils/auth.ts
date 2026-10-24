import dotenv from "dotenv";
dotenv.config();
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../config/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  // এখানে ফলব্যাক স্ট্রিং বা নন-নাল (!) ব্যবহার করুন যাতে undefined না থাকে
  trustedOrigins: [process.env.CLIENT_URL || "http://localhost:3000"],
  advanced: {
    cookiePrefix: "social-sphere",
  },
});

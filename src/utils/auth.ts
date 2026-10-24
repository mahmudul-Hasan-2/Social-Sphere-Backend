import dotenv from "dotenv";
dotenv.config();
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../config/prisma.js";

// CLIENT_URL যদি কমা দিয়ে একাধিক দেওয়া থাকে, তবে সেগুলোকে স্প্লিট করবে

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  // এখানে লোকাল এবং লাইভ উভয় ডোমেন বা পরিবেশ সাপোর্ট পাবে
  trustedOrigins: [process.env.CLIENT_URL as string],
  advanced: {
    cookiePrefix: "social-sphere",
    defaultCookieAttributes: {
      sameSite: "none", // ক্রস-অরিজিনের জন্য জরুরি
      secure: true, // HTTPS এর জন্য বাধ্যতামূলক
      httpOnly: true,
    },
  },
});

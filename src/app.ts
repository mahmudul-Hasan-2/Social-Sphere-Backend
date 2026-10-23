import express, { Application, Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "SocialSphere API is up and running smoothly!",
  });
});
app.all("/api/auth/*", toNodeHandler(auth));

export default app;

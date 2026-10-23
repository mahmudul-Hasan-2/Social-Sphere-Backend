import express, { Application, Request, Response } from "express";
import cors from "cors";

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

export default app;

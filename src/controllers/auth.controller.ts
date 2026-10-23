import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  registerUserService,
  loginUserService,
} from "../services/auth.service";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await registerUserService(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await loginUserService(req.body);
  res.status(200).json({
    success: true,
    message: "Login successful!",
    data: result,
  });
});

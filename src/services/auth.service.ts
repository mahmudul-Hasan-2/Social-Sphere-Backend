import prisma from "../config/prisma";
import jwt from "jsonwebtoken";

export const registerUserService = async (payload: any) => {
  const { name, email, password } = payload;

  // Password Validation Rule: Minimum 6 chars, 1 uppercase, 1 lowercase
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 6 characters long and contain at least one uppercase and one lowercase letter.",
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists!");
  }

  // Production app-e bcrypt/argon2 hashing babohar kora valo
  const newUser = await prisma.user.create({
    data: { name, email, password },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return newUser;
};

export const loginUserService = async (payload: any) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password!");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "secret_key",
    { expiresIn: "7d" },
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

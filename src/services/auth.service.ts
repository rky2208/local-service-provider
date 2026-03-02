import bcrypt from "bcryptjs";
import User from "../models/User.model";
import generateToken from "../utils/generateToken";
import AppError from "../utils/AppError";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "provider" | "admin";
}

interface LoginInput {
  email: string;
  password: string;
}

/**
 * Register Service
 */
const register = async ({ name, email, password, role }: RegisterInput) => {
  // 1️⃣ Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // 4️⃣ Generate JWT
  const token = generateToken(user);

  return { user, token };
};

/**
 * Login Service
 */
const login = async ({ email, password }: LoginInput) => {
  // 1️⃣ Find user (explicitly select password if schema uses select: false)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }
  if (!user.password) {
    throw new AppError("User password not found", 500);
  }

  // 2️⃣ Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  // 3️⃣ Prevent unapproved providers from logging in
  if (user.role === "provider" && !user.isApproved) {
    throw new AppError("Provider not approved yet", 403);
  }

  // 4️⃣ Generate token
  const token = generateToken(user);

  return { user, token };
};

export default {
  register,
  login,
};

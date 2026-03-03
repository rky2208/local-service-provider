import bcrypt from "bcryptjs";
import User from "../models/User.model";
import Provider from "../models/Provider.model";
import generateToken from "../utils/generateToken";
import AppError from "../utils/AppError";
import { Role } from "../constants/roles";

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
  // 1. Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already registered", 400);
  }

  // 2️. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // 4️. Generate JWT Token
  const token = generateToken(user);

  return { user, token };
};

/**
 * Login Service
 */
const login = async ({ email, password }: LoginInput) => {
  // 1️.  Find user (select("+password"): meaning even though password is excluded by default, include it this time.)
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }
  if (!user.password) {
    throw new AppError("User password not found", 500);
  }

  // 2. Find user details from provider model
  const provider = await Provider.findOne({ userId: user._id });

  // 3. Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  // 4. Prevent unapproved providers from logging in
  if (user.role === Role.PROVIDER && !provider?.isApproved) {
    throw new AppError("Provider not approved yet", 403);
  }

  // 5. Generate JWT token
  const token = generateToken(user);

  return { user, token };
};

export default {
  register,
  login,
};

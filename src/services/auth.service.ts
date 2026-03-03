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

  // 2️. Create hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // 4. Create empty provider profile if role is PROVIDER
  if (role === Role.PROVIDER) {
    await Provider.create({
      userId: user._id,
    });
  }

  // 5. Generate JWT Token
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

  // 2. Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  let profileCompleted: boolean | undefined;
  let isApproved: boolean | undefined;

  // 3. Find profileCompleted status of user type provider, from provider model
  if (user.role === Role.PROVIDER) {
    const providerProfile = await Provider.findOne({
      userId: user._id,
    }).select("profileCompleted isApproved");

    profileCompleted = providerProfile?.profileCompleted ?? false;
    isApproved = providerProfile?.isApproved ?? false;
  }

  // 4. Generate JWT token
  const token = generateToken(user);

  return {
    user,
    profileCompleted,
    isApproved,
    token,
  };
};

export default {
  register,
  login,
};

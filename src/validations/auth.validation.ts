import { z } from "zod";
import { Role } from "../constants/roles";

/**
 * Strong password
 */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number");

/**
 * Register validation
 */
export const registerSchema = z.object({
  name: z.string().min(2).max(50).trim(),

  email: z.email("Invalid email format").toLowerCase().trim(),

  password: passwordSchema,

  role: z.nativeEnum(Role).optional(),
});

/**
 * Login validation
 */
export const loginSchema = z.object({
  email: z.email("Invalid email format").toLowerCase().trim(),

  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

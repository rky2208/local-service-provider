import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

/**
 * Global Error Handling Middleware
 *
 * Handles:
 *  - Operational errors (expected errors like invalid input)
 *  - Programming errors (unexpected bugs)
 *  - Development vs Production responses
 */
const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const isDev = process.env.NODE_ENV === "development";

  // =========================
  // 🛠 DEVELOPMENT MODE
  // =========================
  if (isDev) {
    console.error("🔥 ERROR:", err);

    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack, // show full stack for debugging
      error: err,
    });
  }

  // =========================
  // 🚀 PRODUCTION MODE
  // =========================

  // 1️⃣ If it's an operational error → send safe message
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // 2️⃣ If it's an unknown / programming error
  console.error("💥 UNEXPECTED ERROR:", err);

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default errorMiddleware;

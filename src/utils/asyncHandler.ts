import { Request, Response, NextFunction } from "express";

/**
 * Wraps an async Express route handler
 * and automatically forwards errors to Express error middleware.
 *
 * This prevents the need to write try/catch in every controller.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  // Return a new middleware function
  return function (req: Request, res: Response, next: NextFunction) {
    // Execute the async function
    // If it throws/rejects, forward the error to Express
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
}

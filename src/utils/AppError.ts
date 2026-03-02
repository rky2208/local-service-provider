/**
 * Custom application error class.
 *
 * Extends the built-in JavaScript Error class
 * and adds:
 *  - statusCode → HTTP status code (e.g. 400, 404, 500)
 *  - isOperational → identifies expected errors (not programming bugs)
 *
 * This helps us:
 *  - Send proper HTTP responses
 *  - Distinguish operational errors from unknown crashes
 *  - Keep error handling consistent across the app
 */
class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    // Call parent constructor to set the error message
    super(message);

    /**
     * HTTP status code associated with this error.
     * Example:
     *  400 → Bad Request
     *  401 → Unauthorized
     *  404 → Not Found
     *  500 → Internal Server Error
     */
    this.statusCode = statusCode;

    /**
     * Marks this error as an "operational error".
     *
     * Operational errors are:
     *  - Expected errors (invalid input, user not found, etc.)
     *  - Safe to send to client
     *
     * Programming errors (bugs) should NOT be marked operational.
     */
    this.isOperational = true;

    /**
     * Removes this constructor function from the stack trace.
     *
     * Without this:
     *   Stack trace starts at: new AppError(...)
     *
     * With this:
     *   Stack trace starts where the error was actually thrown.
     *
     * This makes logs cleaner and easier to debug.
     */
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
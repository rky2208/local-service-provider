import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

const validate =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        errors: error.errors
      });
    }
  };

export default validate;
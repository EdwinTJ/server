import { Request, Response, NextFunction } from "express";

export const dbErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.code === "23505") {
    // Unique violation
    return res.status(409).json({
      message: "Resource already exists",
      error: error.detail,
    });
  }

  if (error.code === "23503") {
    // Foreign key violation
    return res.status(400).json({
      message: "Invalid reference",
      error: error.detail,
    });
  }

  next(error);
};

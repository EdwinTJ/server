// src/middleware/validateService.ts
import { Request, Response, NextFunction } from "express";
import { Service } from "../types/service";

export const validateService = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const service: Service = req.body;

  // Basic validation
  if (!service.name || typeof service.name !== "string") {
    return res.status(400).json({ message: "Valid service name is required" });
  }

  if (
    !service.price ||
    typeof service.price !== "number" ||
    service.price <= 0
  ) {
    return res.status(400).json({ message: "Valid price is required" });
  }

  if (
    !service.duration ||
    typeof service.duration !== "number" ||
    service.duration <= 0
  ) {
    return res.status(400).json({ message: "Valid duration is required" });
  }

  if (!service.description || typeof service.description !== "string") {
    return res.status(400).json({ message: "Valid description is required" });
  }

  if (service.image && typeof service.image !== "string") {
    return res.status(400).json({ message: "Image URL must be a string" });
  }

  next();
};

import { Request, Response, NextFunction } from "express";
import { TimePeriod } from "../types/availability";

export const validateAvailabilityData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date, timeSlots } = req.body;

  if (!date || !timeSlots || !Array.isArray(timeSlots)) {
    return res.status(400).json({
      error: "Invalid availability data. Required: date and timeSlots array",
    });
  }

  // Validate date format
  if (!Date.parse(date)) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  // Validate time slots format (you can add more specific validation if needed)
  if (!timeSlots.every((slot: string) => typeof slot === "string")) {
    return res.status(400).json({ error: "Time slots must be strings" });
  }

  next();
};

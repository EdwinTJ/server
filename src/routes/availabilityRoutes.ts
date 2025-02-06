import { Router } from "express";
import {
  getAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../controllers/availabilityController";

const availabilityRouter = Router();

// GET /api/availability - Get all availabilities
availabilityRouter.get("/", getAvailabilities);

// GET /api/availability/:id - Get availability by ID
availabilityRouter.get("/:id", getAvailabilityById);

// POST /api/availability - Create new availability
availabilityRouter.post("/", createAvailability);

// PUT /api/availability/:id - Update availability
availabilityRouter.put("/:id", updateAvailability);

// DELETE /api/availability/:id - Delete availability
availabilityRouter.delete("/:id", deleteAvailability);

export default availabilityRouter;

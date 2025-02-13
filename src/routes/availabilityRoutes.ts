import { Router } from "express";
import {
  getAvailabilities,
  getAvailabilityById,
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from "../controllers/availabilityController";
import { validateAvailabilityData } from "../middleware/validateAvailability";

const availabilityRouter = Router();

availabilityRouter.get("/stylist/:stylistId", getAvailabilities);
availabilityRouter.get("/:id", getAvailabilityById);
availabilityRouter.post("/", validateAvailabilityData, createAvailability);
availabilityRouter.put("/:id", validateAvailabilityData, updateAvailability);
availabilityRouter.delete("/:id", deleteAvailability);

export default availabilityRouter;

// src/routes/stylistRoutes.ts
import { Router } from "express";
import { stylistController } from "../controllers/stylistController";
import { validateStylist } from "../middleware/validateStylist";

const stylistRouter = Router();

stylistRouter.post(
  "/register",
  validateStylist,
  stylistController.registerStylist
);
stylistRouter.get("/", stylistController.getAllStylists);
stylistRouter.get("/:id", stylistController.getStylistById);
stylistRouter.put("/:id", validateStylist, stylistController.updateStylist);
stylistRouter.delete("/:id", stylistController.deleteStylist);

export default stylistRouter;

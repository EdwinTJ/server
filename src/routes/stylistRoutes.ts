// src/routes/stylistRoutes.ts
import { Router } from "express";
import { stylistController } from "../controllers/stylistController";

const stylistRouter = Router();

stylistRouter.post("/register", stylistController.registerStylist);
stylistRouter.get("/", stylistController.getAllStylists);
stylistRouter.get("/:id", stylistController.getStylistById);
stylistRouter.put("/:id", stylistController.updateStylist);
stylistRouter.delete("/:id", stylistController.deleteStylist);
stylistRouter.post("/login", stylistController.loginStylist);

export default stylistRouter;

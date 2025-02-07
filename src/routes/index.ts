// src/routes/index.ts
import { Router } from "express";
import userRoutes from "./userRoutes";
import availabilityRouter from "./availabilityRoutes";
import serviceRouter from "./serviceRoutes";
import stylistRouter from "./stylistRoutes";
// Middleware
import { dbErrorHandler } from "../middleware/validateService";
import { validateStylist } from "../middleware/validateStylist";
const router = Router();

router.use("/users", userRoutes);
router.use("/availability", availabilityRouter);
router.use("/services", serviceRouter, dbErrorHandler);
router.use("/stylists", stylistRouter, validateStylist);
export default router;

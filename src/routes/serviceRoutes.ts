// src/routes/serviceRoutes.ts
import { Router } from "express";
import { serviceController } from "../controllers/serviceController";
const serviceRouter = Router();

serviceRouter.get("/", serviceController.getAllServices);
serviceRouter.get("/:id", serviceController.getServiceById);
serviceRouter.post("/", serviceController.createService);
serviceRouter.put("/:id", serviceController.updateService);
serviceRouter.delete("/:id", serviceController.deleteService);

export default serviceRouter;

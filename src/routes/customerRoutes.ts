import { Router } from "express";
import { customerController } from "../controllers/customerController";

const router = Router();

router.post("/find-or-create", customerController.findOrCreate);
router.get("/:id", customerController.getById);
router.get("/", customerController.getAll);

export const customerRoutes = router;

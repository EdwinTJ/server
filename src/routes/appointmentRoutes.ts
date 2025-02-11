import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController";

const router = Router();

router.post("/", appointmentController.create);
router.get(
  "/customer/:customerId",
  appointmentController.getCustomerAppointments
);
router.get("/:id", appointmentController.getById);
router.patch("/:id/status", appointmentController.updateStatus);
router.get("/stylist/:stylistId", appointmentController.getStylistAppointments);

export const appointmentRoutes = router;

import { Request, Response } from "express";
import { AppointmentModel } from "../models/appointmentModel";
import { Appointment, AppointmentService } from "../types";
import { DBAppointment, TransformedAppointment } from "../types/appointment";

export const appointmentController = {
  async create(req: Request, res: Response) {
    try {
      const appointmentData: Appointment = req.body;
      const services: AppointmentService[] = req.body.services;

      const appointment = await AppointmentModel.create(
        appointmentData,
        services
      );
      res.status(201).json(appointment);
    } catch (error) {
      console.error("Error in create:", error);
      res.status(500).json({ error: "Failed to create appointment" });
    }
  },

  async getCustomerAppointments(req: Request, res: Response) {
    try {
      const customerId = parseInt(req.params.customerId);
      const appointments = await AppointmentModel.findByCustomerId(customerId);
      res.json(appointments);
    } catch (error) {
      console.error("Error in getCustomerAppointments:", error);
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const appointmentId = parseInt(req.params.id);
      const appointment = await AppointmentModel.findById(appointmentId);

      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      res.json(appointment);
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ error: "Failed to fetch appointment" });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const appointmentId = parseInt(req.params.id);
      const { status } = req.body;

      const appointment = await AppointmentModel.updateStatus(
        appointmentId,
        status
      );

      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      res.json(appointment);
    } catch (error) {
      console.error("Error in updateStatus:", error);
      res.status(500).json({ error: "Failed to update appointment status" });
    }
  },

  async getStylistAppointments(req: Request, res: Response) {
    try {
      const stylistId = parseInt(req.params.stylistId);

      if (isNaN(stylistId)) {
        return res.status(400).json({ error: "Invalid stylist ID" });
      }

      const appointments: DBAppointment[] =
        await AppointmentModel.findByStylistId(stylistId);

      const transformedAppointments: TransformedAppointment[] =
        appointments.map((appointment) => ({
          id: appointment.id,
          date: appointment.appointment_date,
          time: appointment.appointment_time,
          status: appointment.status,
          totalAmount: appointment.total_amount,
          customer: {
            id: appointment.customer_id,
            firstName: appointment.first_name,
            lastName: appointment.last_name,
            email: appointment.email,
            phone: appointment.phone,
          },
          services: appointment.services.filter(
            (service): service is AppointmentService =>
              service !== null && service.id !== null
          ),
          createdAt: appointment.created_at,
          updatedAt: appointment.updated_at,
        }));

      res.json(transformedAppointments);
    } catch (error) {
      console.error("Error in getStylistAppointments:", error);
      res.status(500).json({ error: "Failed to fetch stylist appointments" });
    }
  },
};

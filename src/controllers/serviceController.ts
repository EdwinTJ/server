// src/controllers/serviceController.ts
import { Request, Response } from "express";
import { Service } from "../types/service";

// In-memory store for services (replace with database in production)
let services: Record<string, Service> = {};

export const serviceController = {
  // Get all services
  getAllServices: async (req: Request, res: Response) => {
    try {
      const servicesList = Object.values(services);
      res.status(200).json(servicesList);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services", error });
    }
  },

  // Get a single service by ID
  getServiceById: async (req: Request, res: Response) => {
    try {
      const service = services[req.params.id];
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: "Error fetching service", error });
    }
  },

  // Create a new service
  createService: async (req: Request, res: Response) => {
    try {
      const newService: Service = req.body;

      // Validate required fields
      if (
        !newService.name ||
        !newService.price ||
        !newService.duration ||
        !newService.description
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Generate a unique ID (you might want to use UUID in production)
      const id = Date.now().toString();
      services[id] = { ...newService, id };

      console.log("Service created:", services[id]);
      res.status(201).json(services[id]);
    } catch (error) {
      res.status(500).json({ message: "Error creating service", error });
    }
  },

  // Update a service
  updateService: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedService: Service = req.body;

      if (!services[id]) {
        return res.status(404).json({ message: "Service not found" });
      }

      services[id] = { ...services[id], ...updatedService };
      res.status(200).json(services[id]);
    } catch (error) {
      res.status(500).json({ message: "Error updating service", error });
    }
  },

  // Delete a service
  deleteService: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!services[id]) {
        return res.status(404).json({ message: "Service not found" });
      }

      delete services[id];
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting service", error });
    }
  },
};

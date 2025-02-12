import { Request, Response } from "express";
import { Service } from "../types/service";
import pool from "../config/database";
import { ServiceModel } from "../models/services";
export const serviceController = {
  // Get all services
  getAllServices: async (req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM services");
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "Error fetching services", error });
    }
  },

  // Get a single service by ID
  getServiceById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query("SELECT * FROM services WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error fetching service", error });
    }
  },

  // Create a new service
  createService: async (req: Request<Omit<Service, "id">>, res: Response) => {
    try {
      const { name, price, description, duration, image } = req.body;

      if (!name || !price || !description || !duration) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      if (price <= 0 || duration <= 0) {
        return res.status(400).json({
          message: "Price and duration must be positive numbers",
        });
      }
      const result = await pool.query(
        `INSERT INTO services (name, price, description, duration, image)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, price, description, duration, image]
      );

      console.log("Service created:", result.rows[0]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error creating service", error });
    }
  },

  // Update a service
  updateService: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, price, description, duration, image } = req.body;

      const result = await pool.query(
        `UPDATE services 
         SET name = $1, price = $2, description = $3, duration = $4, image = $5
         WHERE id = $6
         RETURNING *`,
        [name, price, description, duration, image, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error updating service", error });
    }
  },

  // Delete a service
  deleteService: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const result = ServiceModel.delete(parseInt(id));
      // Check if service was found
      if (!result) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting service", error });
    }
  },
};

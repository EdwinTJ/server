// src/controllers/stylistController.ts
import { Request, Response } from "express";
import { Stylist } from "../types/stylist";
import { hashPassword } from "../utils/passwordUtils";

// In-memory store (replace with database in production)
let stylists: Record<string, Stylist> = {};

export const stylistController = {
  // Register new stylist
  registerStylist: async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName, phone } = req.body;

      // Check if stylist already exists
      const existingStylist = Object.values(stylists).find(
        (s) => s.email === email
      );
      if (existingStylist) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create new stylist
      const id = Date.now().toString();
      const newStylist: Stylist = {
        id,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      stylists[id] = newStylist;
      console.log("New stylist registered:", newStylist);
      // Remove password from response
      const { password: _, ...stylistResponse } = newStylist;
      res.status(201).json(stylistResponse);
    } catch (error) {
      res.status(500).json({ message: "Error registering stylist", error });
    }
  },

  // Get all stylists
  getAllStylists: async (req: Request, res: Response) => {
    try {
      // Remove passwords from response
      const stylistsList = Object.values(stylists).map(
        ({ password, ...stylist }) => stylist
      );
      res.status(200).json(stylistsList);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stylists", error });
    }
  },

  // Get stylist by ID
  getStylistById: async (req: Request, res: Response) => {
    try {
      const stylist = stylists[req.params.id];
      if (!stylist) {
        return res.status(404).json({ message: "Stylist not found" });
      }

      // Remove password from response
      const { password, ...stylistResponse } = stylist;
      res.status(200).json(stylistResponse);
    } catch (error) {
      res.status(500).json({ message: "Error fetching stylist", error });
    }
  },

  // Update stylist
  updateStylist: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!stylists[id]) {
        return res.status(404).json({ message: "Stylist not found" });
      }

      // If password is being updated, hash it
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }

      stylists[id] = {
        ...stylists[id],
        ...updateData,
        updatedAt: new Date(),
      };

      // Remove password from response
      const { password, ...stylistResponse } = stylists[id];
      res.status(200).json(stylistResponse);
    } catch (error) {
      res.status(500).json({ message: "Error updating stylist", error });
    }
  },

  // Delete stylist
  deleteStylist: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!stylists[id]) {
        return res.status(404).json({ message: "Stylist not found" });
      }

      delete stylists[id];
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting stylist", error });
    }
  },
};

// src/controllers/stylistController.ts
import { Request, Response } from "express";
import { StylistModel } from "../models/stylistModel";
import { hashPassword, comparePassword } from "../utils/passwordUtils";
const stylistModel = new StylistModel();

export const stylistController = {
  // Register new stylist
  registerStylist: async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName, phone, role } = req.body;

      // Check if stylist already exists
      const existingStylist = await stylistModel.getByEmail(email);
      if (existingStylist) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create new stylist
      const newStylist = await stylistModel.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role,
      });

      // Remove password from response
      const { password: _, ...stylistResponse } = newStylist;

      console.log("New stylist registered:", stylistResponse);
      res.status(201).json(stylistResponse);
    } catch (error) {
      console.error("Error registering stylist:", error);
      res.status(500).json({
        message: "Error registering stylist",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Get all stylists
  getAllStylists: async (req: Request, res: Response) => {
    try {
      const stylists = await stylistModel.getAll();
      // Remove passwords from response
      const stylistsList = stylists.map(({ password, ...stylist }) => stylist);
      res.status(200).json(stylistsList);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      res.status(500).json({
        message: "Error fetching stylists",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Get stylist by ID
  getStylistById: async (req: Request, res: Response) => {
    try {
      const stylist = await stylistModel.getById(req.params.id);
      if (!stylist) {
        return res.status(404).json({ message: "Stylist not found" });
      }

      // Remove password from response
      const { password, ...stylistResponse } = stylist;
      res.status(200).json(stylistResponse);
    } catch (error) {
      console.error("Error fetching stylist:", error);
      res.status(500).json({
        message: "Error fetching stylist",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Update stylist
  updateStylist: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      // If password is being updated, hash it
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }

      const updatedStylist = await stylistModel.update(id, updateData);
      if (!updatedStylist) {
        return res.status(404).json({ message: "Stylist not found" });
      }

      // Remove password from response
      const { password, ...stylistResponse } = updatedStylist;
      res.status(200).json(stylistResponse);
    } catch (error) {
      console.error("Error updating stylist:", error);
      res.status(500).json({
        message: "Error updating stylist",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Delete stylist
  deleteStylist: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await stylistModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Stylist not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting stylist:", error);
      res.status(500).json({
        message: "Error deleting stylist",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  loginStylist: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const stylist = await stylistModel.getByEmail(email);
      if (!stylist) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(password, stylist.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Remove password from response
      const { password: _, ...stylistResponse } = stylist;

      // Include role-based authorization info in response
      res.status(200).json({
        message: "Login successful",
        stylist: stylistResponse,
        auth: {
          isAdmin: stylist.role === "admin",
          role: stylist.role,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        message: "Error during login",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

import { Request, Response } from "express";
import { CustomerModel } from "../models/customerModel";
import { Customer } from "../types";

export const customerController = {
  async findOrCreate(req: Request, res: Response) {
    try {
      const customerData: Customer = req.body;

      // Check if customer exists
      let customer = await CustomerModel.findByEmail(customerData.email);

      if (!customer) {
        // Create new customer if doesn't exist
        customer = await CustomerModel.create(customerData);
      }

      res.json(customer);
    } catch (error) {
      console.error("Error in findOrCreate:", error);
      res.status(500).json({ error: "Failed to process customer" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const customerId = parseInt(req.params.id);
      const customer = await CustomerModel.findById(customerId);

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      res.json(customer);
    } catch (error) {
      console.error("Error in getById:", error);
      res.status(500).json({ error: "Failed to fetch customer" });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const customers = await CustomerModel.getAll();
      res.json(customers);
    } catch (error) {
      console.error("Error in getAll:", error);
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  },
};

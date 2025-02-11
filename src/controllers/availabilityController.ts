import { Request, Response } from "express";
import { AvailabilityModel } from "../models/availabilityModel";
import { Availability } from "../types/availability";

export const getAvailabilities = async (req: Request, res: Response) => {
  try {
    const stylistId = parseInt(req.params.stylistId);

    if (isNaN(stylistId)) {
      return res.status(400).json({ error: "Invalid stylist ID" });
    }
    const availabilities = await AvailabilityModel.findAllByStylistId(
      stylistId
    );

    if (!availabilities || availabilities.length === 0) {
      return res.status(404).json({
        error: `No availabilities found for stylist ${stylistId}`,
      });
    }

    res.status(200).json(availabilities);
  } catch (error) {
    console.error("Error in getAvailabilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAvailabilityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const availability = await AvailabilityModel.findById(id);

    if (!availability) {
      return res.status(404).json({ error: "Availability not found" });
    }

    res.status(200).json(availability);
  } catch (error) {
    console.error("Error getting availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAvailability = async (req: Request, res: Response) => {
  try {
    const availabilityData: Omit<Availability, "id"> = {
      date: new Date(req.body.date),
      timeSlots: req.body.timeSlots,
      stylist: req.body.stylist || "1", // Default to stylist ID 1
    };

    const newAvailability = await AvailabilityModel.create(availabilityData);
    res.status(201).json(newAvailability);
  } catch (error) {
    console.error("Error creating availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const availabilityData: Partial<Availability> = {
      date: req.body.date ? new Date(req.body.date) : undefined,
      timeSlots: req.body.timeSlots,
      stylist: req.body.stylist,
    };

    const updatedAvailability = await AvailabilityModel.update(
      id,
      availabilityData
    );

    if (!updatedAvailability) {
      return res.status(404).json({ error: "Availability not found" });
    }

    res.status(200).json(updatedAvailability);
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedAvailability = await AvailabilityModel.delete(id);

    if (!deletedAvailability) {
      return res.status(404).json({ error: "Availability not found" });
    }

    res.status(200).json({
      message: `Availability ${id} deleted successfully`,
      deletedAvailability,
    });
  } catch (error) {
    console.error("Error deleting availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import { Request, Response } from "express";
import { Availability } from "../types/availability";

// Get all availabilities
export const getAvailabilities = async (req: Request, res: Response) => {
  try {
    // TODO: Add database integration
    console.log("Getting all availabilities");
    const availabilities: Availability[] = [];
    res.status(200).json(availabilities);
  } catch (error) {
    console.error("Error getting availabilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get availability by ID
export const getAvailabilityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Getting availability by ID:", id);

    // TODO: Add database integration
    const availability: Availability = {
      id,
      date: new Date(),
      timeSlots: [],
    };

    res.status(200).json(availability);
  } catch (error) {
    console.error("Error getting availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new availability
export const createAvailability = async (req: Request, res: Response) => {
  try {
    const availabilityData: Availability = req.body;
    console.log("Creating new availability:", availabilityData);

    // TODO: Add database integration
    // For now, just echo back the data with a generated ID
    const newAvailability = {
      ...availabilityData,
      id: Date.now().toString(),
      date: new Date(availabilityData.date), // Ensure date is properly parsed
    };

    res.status(201).json(newAvailability);
  } catch (error) {
    console.error("Error creating availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update availability
export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const availabilityData: Availability = req.body;
    console.log("Updating availability:", id, availabilityData);

    // TODO: Add database integration
    const updatedAvailability = {
      ...availabilityData,
      id,
      date: new Date(availabilityData.date),
    };

    res.status(200).json(updatedAvailability);
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete availability
export const deleteAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Deleting availability:", id);

    // TODO: Add database integration
    res
      .status(200)
      .json({ message: `Availability ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

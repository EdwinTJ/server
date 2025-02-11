import pool from "../config/database";
import { Availability } from "../types/availability";

export class AvailabilityModel {
  static async findAllByStylistId(stylistId: number) {
    try {
      const queryText = `
        SELECT 
          a.id,
          a.date,
          a.time_slots,
          a.stylist_id
        FROM availabilities a
        WHERE a.stylist_id = $1
        ORDER BY a.date DESC
      `;

      // Execute the query with the parameter
      const result = await pool.query(queryText, [stylistId]);

      return result.rows;
    } catch (error) {
      console.error("Database error in findAllByStylistId:", error);
      throw error;
    }
  }

  static async findById(id: string) {
    const query = `
      SELECT a.*, s.first_name, s.last_name
      FROM availabilities a
      JOIN stylists s ON s.id = a.stylist_id
      WHERE a.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(availability: Omit<Availability, "id">) {
    const query = `
      INSERT INTO availabilities (date, time_slots, stylist_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [
      availability.date,
      availability.timeSlots,
      availability.stylist || 1, // Default to stylist ID 1 as per your requirement
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id: string, availability: Partial<Availability>) {
    const query = `
      UPDATE availabilities
      SET date = COALESCE($1, date),
          time_slots = COALESCE($2, time_slots),
          stylist_id = COALESCE($3, stylist_id)
      WHERE id = $4
      RETURNING *
    `;
    const values = [
      availability.date,
      availability.timeSlots,
      availability.stylist,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id: string) {
    const query = "DELETE FROM availabilities WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

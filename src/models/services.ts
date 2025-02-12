import { Service } from "../types/service";
import pool from "../config/database";

export const ServiceModel = {
  async create(service: Service): Promise<Service> {
    const query = `
        INSERT INTO services (price, name, description, duration, image)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
    const values = [
      service.price,
      service.name,
      service.description,
      service.duration,
      service.image,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getALl(): Promise<Service[]> {
    const query = `
        SELECT * FROM services;
        `;
    const result = await pool.query(query);
    return result.rows;
  },

  async delete(id: number): Promise<Service> {
    const query = `
        DELETE FROM services
        WHERE id = $1
        RETURNING *;
        `;
    const values = [id];

    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

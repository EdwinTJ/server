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

  async delete(id: string): Promise<Service | null> {
    const query = `
        DELETE FROM services
        WHERE id = $1
        RETURNING *;
        `;
    const values = [id];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },

  async update(id: string, service: Partial<Service>): Promise<Service | null> {
    const query = `
        UPDATE services
        SET 
          name = COALESCE($1, name),
          price = COALESCE($2, price),
          description = COALESCE($3, description),
          duration = COALESCE($4, duration),
          image = COALESCE($5, image)
        WHERE id = $6
        RETURNING *;
        `;
    const values = [
      service.name,
      service.price,
      service.description,
      service.duration,
      service.image,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  },
};

import { Service } from "../types/service";
import { Pool } from "pg";
import pool from "@/config/database";

export class ServiceModel {
  private pool: Pool;
  constructor() {
    this.pool = pool;
  }

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

    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async getALl(): Promise<Service[]> {
    const query = `
        SELECT * FROM services;
        `;
    const result = await this.pool.query(query);
    return result.rows;
  }
}

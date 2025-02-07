import { Pool } from "pg";
import { Stylist } from "../types/stylist";
import pool from "../config/database";

export class StylistModel {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async create(
    stylist: Omit<Stylist, "id" | "createdAt" | "updatedAt">
  ): Promise<Stylist> {
    const query = `
            INSERT INTO stylists (email, password, first_name, last_name, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
    const values = [
      stylist.email,
      stylist.password,
      stylist.firstName,
      stylist.lastName,
      stylist.phone,
    ];

    const result = await this.pool.query(query, values);
    return this.mapToCamelCase(result.rows[0]);
  }

  async getAll(): Promise<Stylist[]> {
    const query = `
            SELECT * FROM stylists;
        `;
    const result = await this.pool.query(query);
    return result.rows.map(this.mapToCamelCase);
  }

  async getById(id: string): Promise<Stylist | null> {
    const query = `
            SELECT * FROM stylists
            WHERE id = $1;
        `;
    const result = await this.pool.query(query, [id]);
    return result.rows.length ? this.mapToCamelCase(result.rows[0]) : null;
  }

  async getByEmail(email: string): Promise<Stylist | null> {
    const query = `
            SELECT * FROM stylists
            WHERE email = $1;
        `;
    const result = await this.pool.query(query, [email]);
    return result.rows.length ? this.mapToCamelCase(result.rows[0]) : null;
  }

  async update(id: string, stylist: Partial<Stylist>): Promise<Stylist | null> {
    const fields = Object.keys(stylist).map((key, index) => {
      // Convert camelCase to snake_case for PostgreSQL
      const snakeCase = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      return `${snakeCase} = $${index + 1}`;
    });

    const values = Object.values(stylist);

    const query = `
            UPDATE stylists
            SET ${fields.join(", ")}
            WHERE id = $${values.length + 1}
            RETURNING *;
        `;

    const result = await this.pool.query(query, [...values, id]);
    return result.rows.length ? this.mapToCamelCase(result.rows[0]) : null;
  }

  async delete(id: string): Promise<boolean> {
    const query = `
            DELETE FROM stylists
            WHERE id = $1
            RETURNING id;
        `;
    const result = await this.pool.query(query, [id]);
    return result?.rowCount ? result.rowCount > 0 : false;
  }

  private mapToCamelCase(row: any): Stylist {
    return {
      id: row.id.toString(),
      email: row.email,
      password: row.password,
      firstName: row.first_name,
      lastName: row.last_name,
      phone: row.phone,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

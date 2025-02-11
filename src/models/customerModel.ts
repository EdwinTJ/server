// src/models/customerModel.ts
import pool from "../config/database";
import { Customer } from "../types";

export const CustomerModel = {
  async findByEmail(email: string) {
    const result = await pool.query(
      "SELECT * FROM customers WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  async create(customer: Customer) {
    const result = await pool.query(
      `INSERT INTO customers (first_name, last_name, email, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [customer.firstName, customer.lastName, customer.email, customer.phone]
    );
    return result.rows[0];
  },

  async findById(id: number) {
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async getAll(): Promise<Customer[]> {
    const result = await pool.query("SELECT * FROM customers");

    return result.rows;
  },
};

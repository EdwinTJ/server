// src/models/appointmentModel.ts
import pool from "../config/database";
import { Appointment, AppointmentService } from "../types";
import { DBAppointment } from "../types/appointment";

export const AppointmentModel = {
  async create(
    appointmentData: Appointment,
    services: AppointmentService[]
  ): Promise<Appointment> {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // First insert the appointment
      const appointmentResult = await client.query(
        `INSERT INTO appointments 
        (customer_id, stylist_id, appointment_date, appointment_time, status, total_amount)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`,
        [
          appointmentData.customerId,
          appointmentData.stylistId,
          appointmentData.appointmentDate,
          appointmentData.appointmentTime,
          appointmentData.status,
          appointmentData.totalAmount,
        ]
      );

      const appointmentId = appointmentResult.rows[0].id;

      // Then insert the appointment services
      for (const service of services) {
        await client.query(
          `INSERT INTO appointment_services 
          (appointment_id, service_id, price)
          VALUES ($1, $2, $3)`,
          [appointmentId, service.serviceId, service.price]
        );
      }

      await client.query("COMMIT");

      return {
        ...appointmentData,
        id: appointmentId,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async findByCustomerId(customerId: number) {
    const result = await pool.query(
      `SELECT 
         a.*,
         json_agg(
           json_build_object(
             'id', as_service.id,
             'serviceId', as_service.service_id,
             'price', as_service.price
           )
         ) as services
       FROM appointments a
       LEFT JOIN appointment_services as_service ON a.id = as_service.appointment_id
       WHERE a.customer_id = $1
       GROUP BY a.id`,
      [customerId]
    );
    return result.rows;
  },

  async findById(appointmentId: number) {
    const query = `
      SELECT 
        a.*,
        c.first_name,
        c.last_name,
        c.email,
        c.phone,
        json_agg(
          json_build_object(
            'id', aps.id,
            'serviceId', s.id,
            'serviceName', s.name,
            'price', aps.price
          )
        ) FILTER (WHERE aps.id IS NOT NULL) as services
      FROM appointments a
      LEFT JOIN customers c ON a.customer_id = c.id
      LEFT JOIN appointment_services aps ON a.id = aps.appointment_id
      LEFT JOIN services s ON aps.service_id = s.id
      WHERE a.id = $1
      GROUP BY a.id, c.id, c.first_name, c.last_name, c.email, c.phone;
    `;

    const result = await pool.query(query, [appointmentId]);
    return result.rows[0];
  },

  async updateStatus(id: number, status: Appointment["status"]) {
    const result = await pool.query(
      `UPDATE appointments
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  },

  async findByStylistId(stylistId: number): Promise<DBAppointment[]> {
    const result = await pool.query(
      `SELECT 
        a.*,
        c.first_name,
        c.last_name,
        c.email,
        c.phone,
        json_agg(
          json_build_object(
            'id', s.id,
            'name', s.name,
            'price', aps.price,
            'duration', s.duration
          )
        ) as services
      FROM appointments a
      LEFT JOIN customers c ON a.customer_id = c.id
      LEFT JOIN appointment_services aps ON a.id = aps.appointment_id
      LEFT JOIN services s ON aps.service_id = s.id
      WHERE a.stylist_id = $1
      GROUP BY a.id, c.id
      ORDER BY a.appointment_date DESC, a.appointment_time ASC`,
      [stylistId]
    );
    return result.rows;
  },
};

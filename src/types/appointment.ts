export interface AppointmentService {
  id?: number;
  appointmentId: number;
  serviceId: string; // UUID
  price: number;
  createdAt?: Date;
}
export interface AppointmentCustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DBAppointment {
  id: number;
  customer_id: number;
  stylist_id: number;
  appointment_date: Date;
  appointment_time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  total_amount: number;
  created_at: Date;
  updated_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  services: AppointmentService[];
}

export interface TransformedAppointment {
  id: number;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalAmount: number;
  customer: AppointmentCustomer;
  services: AppointmentService[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Appointment {
  id?: number;
  customerId: number;
  stylistId: number;
  appointmentDate: Date;
  appointmentTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentService {
  id?: number;
  appointmentId: number;
  serviceId: string; // UUID
  price: number;
  createdAt?: Date;
}

// src/types/auth.ts
import { Stylist } from "./stylist";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  stylist: Omit<Stylist, "password">;
}

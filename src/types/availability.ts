export type TimePeriod = "morning" | "afternoon" | "evening" | "night";

export interface TimeSlot {
  time: string;
  period: TimePeriod;
}

export interface Availability {
  id?: string;
  date: Date;
  timeSlots: string[];
  userId?: string;
}

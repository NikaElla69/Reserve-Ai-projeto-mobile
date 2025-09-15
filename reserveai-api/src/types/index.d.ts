export type Role = 'admin' | 'client';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
}

export interface Restaurant {
  id: number;
  name: string;
  logoUrl?: string;
  maxCapacity: number;
  openAt: string;
  closeAt: string;
  policies?: string[];
}

export type ReservationStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'seated' | 'no_show';

export interface Reservation {
  id: number;
  restaurantId: number;
  userId: number;
  people: number;
  date: string;
  time: string;
  note?: string;
  status: ReservationStatus;
  rejectionReason?: string;
  createdAt: string;
}

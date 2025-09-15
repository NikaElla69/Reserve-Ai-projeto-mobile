import type { User, Restaurant, Reservation } from '../types';

let uid = 2;
let rid = 2;
let rsvid = 2;

export const users: User[] = [
  { id: 1, name: 'Admin', email: 'admin@reserveai.com', role: 'admin', password: 'admin' },
  { id: 2, name: 'Cliente Demo', email: 'cliente@demo.com', role: 'client', password: '123456' }
];

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Pizzaria Maresia',
    logoUrl: 'https://placehold.co/96x96?text=M',
    maxCapacity: 340,
    openAt: '18:00',
    closeAt: '23:30',
    policies: [
      'Atrasos acima de 15 min podem perder a mesa',
      'Reservas até 20:30',
      'Confirmação por e-mail/SMS'
    ]
  },
  {
    id: 2,
    name: 'Bistrô Reserva',
    logoUrl: 'https://placehold.co/96x96?text=B',
    maxCapacity: 120,
    openAt: '19:00',
    closeAt: '23:00'
  }
];

export const reservations: Reservation[] = [
  {
    id: 1,
    restaurantId: 1,
    userId: 2,
    people: 4,
    date: '2025-09-14',
    time: '20:00',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    restaurantId: 2,
    userId: 2,
    people: 2,
    date: '2025-09-16',
    time: '19:30',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

export const nextId = (kind: 'user' | 'restaurant' | 'reservation') => {
  if (kind === 'user') return ++uid;
  if (kind === 'restaurant') return ++rid;
  return ++rsvid;
};

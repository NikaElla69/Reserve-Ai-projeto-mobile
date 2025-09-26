import { reservations, users, restaurants, nextId } from '../data/store.js'; // Alterado de '../data/store'
import type { Request, Response } from 'express';
import { sendMail } from '../utils/mailer.js'; // Alterado de '../utils/mailer'

export const listMyReservations = (req: Request, res: Response) => {
  const user = (req as any).user;
  const mine = reservations.filter(r => r.userId === user.id);
  res.json(mine);
};

export const listAllReservations = (_req: Request, res: Response) => {
  res.json(reservations);
};

export const createReservation = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { restaurantId, people, date, time, note } = req.body as any;
  const id = nextId('reservation');
  const reservation = {
    id,
    restaurantId: Number(restaurantId),
    userId: user.id,
    people: Number(people),
    date,
    time,
    note,
    status: 'pending',
    createdAt: new Date().toISOString()
  } as const;
  (reservations as any).push(reservation);
  const u = users.find(u => u.id === user.id);
  if (u) await sendMail(u.email, 'Recebemos sua solicitação', `Reserva pendente em ${date} às ${time}.`);
  res.status(201).json(reservation);
};

export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body as { status: string; rejectionReason?: string };
  const item = reservations.find(r => r.id === Number(id));
  if (!item) return res.status(404).json({ error: 'Reserva não encontrada' });

  (item as any).status = status;
  (item as any).rejectionReason = rejectionReason;

  const u = users.find(u => u.id === item.userId);
  const rest = restaurants.find(r => r.id === item.restaurantId);

  if (u && rest) {
    const subject = status === 'confirmed' ? 'Sua reserva foi confirmada' : status === 'rejected' ? 'Sua reserva foi recusada' : 'Atualização da reserva';
    const body = `Reserva ${status} para ${rest.name} em ${item.date} às ${item.time}` + (rejectionReason ? ` | Motivo: ${rejectionReason}` : '');
    await sendMail(u.email, subject, body);
  }

  res.json(item);
};
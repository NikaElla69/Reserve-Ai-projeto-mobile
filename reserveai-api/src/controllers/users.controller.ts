import { users } from '../data/store';
import type { Request, Response } from 'express';

export const me = (req: Request, res: Response) => {
  const user = (req as any).user;
  const found = users.find(u => u.id === user.id);
  if (!found) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json({ id: found.id, name: found.name, email: found.email, role: found.role });
};

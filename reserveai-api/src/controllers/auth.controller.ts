import { users } from '../data/store';
import type { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
  const token = user.role === 'admin' ? 'admin' : 'client';
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

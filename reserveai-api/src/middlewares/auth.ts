import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = header.replace('Bearer ', '');
  (req as any).user = token === 'admin' ? { id: 1, role: 'admin' } : { id: 2, role: 'client' };
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
  next();
};

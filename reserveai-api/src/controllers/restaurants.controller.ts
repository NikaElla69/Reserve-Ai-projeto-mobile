import { restaurants } from '../data/store';
import type { Request, Response } from 'express';

export const listRestaurants = (_req: Request, res: Response) => {
  res.json(restaurants);
};

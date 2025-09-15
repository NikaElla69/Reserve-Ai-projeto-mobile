import { Router } from 'express';
import { listRestaurants } from '../controllers/restaurants.controller';
import { requireAuth } from '../middlewares/auth';
const router = Router();
router.get('/', requireAuth, listRestaurants);
export default router;

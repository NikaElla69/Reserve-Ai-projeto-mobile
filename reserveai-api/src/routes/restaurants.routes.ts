import { Router } from 'express';
import { listRestaurants } from '../controllers/restaurants.controller.js'; // Alterado de '../controllers/restaurants.controller'
import { requireAuth } from '../middlewares/auth.js'; // Alterado de '../middlewares/auth'
const router = Router();
router.get('/', requireAuth, listRestaurants);
export default router;
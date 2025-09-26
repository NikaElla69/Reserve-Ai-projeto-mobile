import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js'; // Alterado de '../middlewares/auth'
import { me } from '../controllers/users.controller.js'; // Alterado de '../controllers/users.controller'
const router = Router();
router.get('/me', requireAuth, me);
export default router;
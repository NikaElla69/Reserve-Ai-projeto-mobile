import { Router } from 'express';
import { requireAdmin, requireAuth } from '../middlewares/auth';
import { createReservation, listAllReservations, listMyReservations, updateStatus } from '../controllers/reservations.controller';
const router = Router();
router.get('/me', requireAuth, listMyReservations);
router.get('/', requireAuth, requireAdmin, listAllReservations);
router.post('/', requireAuth, createReservation);
router.patch('/:id/status', requireAuth, requireAdmin, updateStatus);
export default router;

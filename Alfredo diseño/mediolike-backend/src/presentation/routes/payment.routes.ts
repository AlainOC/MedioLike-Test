import { Router } from 'express';
import { checkout } from '../controllers/payment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/checkout', authMiddleware, checkout);

export default router;

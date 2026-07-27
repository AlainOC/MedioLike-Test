import { Router } from 'express';
import { EventController } from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API para gestión de Eventos en Vivo
 */

const router = Router();

router.get('/', authMiddleware, EventController.getUpcomingEvents);
router.post('/', authMiddleware, EventController.createEvent);

export default router;

import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API para gestión de notificaciones
 */

const router = Router();

router.get('/', authMiddleware, NotificationController.getMyNotifications);
router.put('/:id/read', authMiddleware, NotificationController.markAsRead);

export default router;

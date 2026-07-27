"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API para gestión de notificaciones
 */
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, notification_controller_1.NotificationController.getMyNotifications);
router.put('/:id/read', auth_middleware_1.authMiddleware, notification_controller_1.NotificationController.markAsRead);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map
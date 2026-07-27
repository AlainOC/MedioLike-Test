"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API para gestión de Eventos en Vivo
 */
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, event_controller_1.EventController.getUpcomingEvents);
router.post('/', auth_middleware_1.authMiddleware, event_controller_1.EventController.createEvent);
exports.default = router;
//# sourceMappingURL=event.routes.js.map
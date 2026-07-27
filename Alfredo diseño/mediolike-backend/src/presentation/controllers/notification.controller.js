"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class NotificationController {
    /**
     * @swagger
     * /api/notifications:
     *   get:
     *     summary: Obtiene las notificaciones del usuario autenticado
     *     tags: [Notifications]
     *     responses:
     *       200:
     *         description: Lista de notificaciones
     */
    static async getMyNotifications(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ error: 'No autorizado' });
            const notifications = await prisma.notification.findMany({
                where: { userId: Number(userId) },
                orderBy: { createdAt: 'desc' }
            });
            res.json(notifications);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener notificaciones' });
        }
    }
    /**
     * @swagger
     * /api/notifications/{id}/read:
     *   put:
     *     summary: Marca una notificación como leída
     *     tags: [Notifications]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Notificación marcada como leída
     */
    static async markAsRead(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            const notif = await prisma.notification.updateMany({
                where: { id: Number(id), userId: Number(userId) },
                data: { isRead: true }
            });
            res.json({ message: 'Marcada como leída', count: notif.count });
        }
        catch (error) {
            res.status(500).json({ error: 'Error al actualizar notificación' });
        }
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map
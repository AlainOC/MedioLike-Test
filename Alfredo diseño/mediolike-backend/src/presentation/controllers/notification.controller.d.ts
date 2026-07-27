import { Request, Response } from 'express';
export declare class NotificationController {
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
    static getMyNotifications(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
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
    static markAsRead(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=notification.controller.d.ts.map
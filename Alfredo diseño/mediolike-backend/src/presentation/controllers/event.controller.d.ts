import { Request, Response } from 'express';
export declare class EventController {
    /**
     * @swagger
     * /api/events:
     *   get:
     *     summary: Obtiene los próximos eventos en vivo
     *     tags: [Events]
     *     responses:
     *       200:
     *         description: Lista de eventos
     */
    static getUpcomingEvents(req: Request, res: Response): Promise<void>;
    /**
     * @swagger
     * /api/events:
     *   post:
     *     summary: Programa un nuevo evento (Solo Instructores)
     *     tags: [Events]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *               description:
     *                 type: string
     *               date:
     *                 type: string
     *                 format: date-time
     *               url:
     *                 type: string
     *     responses:
     *       201:
     *         description: Evento programado
     */
    static createEvent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=event.controller.d.ts.map
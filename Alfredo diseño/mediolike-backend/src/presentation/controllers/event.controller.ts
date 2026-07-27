import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EventController {
  
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
  static async getUpcomingEvents(req: Request, res: Response) {
    try {
      const events = await prisma.liveEvent.findMany({
        where: { date: { gte: new Date() } },
        orderBy: { date: 'asc' },
        include: { instructor: { select: { profile: true } } }
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener eventos' });
    }
  }

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
  static async createEvent(req: Request, res: Response) {
    try {
      const { title, description, date, url } = req.body;
      const instructorId = (req as any).user?.id;
      
      if (!instructorId) return res.status(401).json({ error: 'No autorizado' });

      const event = await prisma.liveEvent.create({
        data: {
          title,
          description,
          date: new Date(date),
          url,
          instructorId: Number(instructorId)
        }
      });
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear evento' });
    }
  }
}

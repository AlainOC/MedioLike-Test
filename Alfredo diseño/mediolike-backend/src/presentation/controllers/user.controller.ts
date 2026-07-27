import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        include: {
          profile: true,
          role: true,
          _count: {
            select: { courses: true, enrollments: true }
          }
        }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  static async updateUserRole(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { roleName } = req.body; // e.g. "Instructor", "Admin", "Participant"

      const role = await prisma.role.findUnique({
        where: { name: roleName }
      });

      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { roleId: role.id },
        include: {
          profile: true,
          role: true
        }
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el rol del usuario' });
    }
  }

  static async getMyEnrollments(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: 'No autorizado' });

      const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            include: { category: true }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });

      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener matrículas' });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: 'No autorizado' });

      const { firstName, lastName, bio } = req.body;
      const avatarUrl = req.file ? `/uploads/images/${req.file.filename}` : undefined;

      const updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          firstName,
          lastName,
          bio,
          ...(avatarUrl && { avatarUrl })
        }
      });

      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
  }
}

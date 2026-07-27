import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCommentsByCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { courseId: Number(courseId) },
      include: {
        user: {
          select: {
            email: true,
            role: { select: { name: true } },
            profile: { select: { firstName: true, lastName: true, avatarUrl: true } }
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { text, courseId, userId } = req.body;
    
    if (!text || !courseId || !userId) {
      return res.status(400).json({ message: 'Text, courseId, and userId are required' });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        courseId: Number(courseId),
        userId: Number(userId)
      },
      include: {
        user: {
          select: {
            email: true,
            role: { select: { name: true } },
            profile: { select: { firstName: true, lastName: true, avatarUrl: true } }
          }
        }
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Error creating comment' });
  }
};

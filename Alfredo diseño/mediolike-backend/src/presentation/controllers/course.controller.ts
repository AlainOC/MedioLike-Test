import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CourseController {
  
  static async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await prisma.course.findMany({
        include: {
          instructor: { select: { profile: true } },
          category: true,
          modules: { include: { lessons: true } }
        }
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los cursos' });
    }
  }

  static async getCourseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const course = await prisma.course.findUnique({
        where: { id: Number(id) },
        include: {
          instructor: { select: { profile: true } },
          category: true,
          modules: { include: { lessons: true } }
        }
      });
      if (!course) return res.status(404).json({ error: 'Curso no encontrado' });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el curso' });
    }
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const { title, description, price, image, categoryId, syllabus } = req.body;
      const instructorId = (req as any).user?.id;
      
      if (!instructorId) {
        return res.status(401).json({ error: 'No autorizado. Se requiere ser instructor.' });
      }

      // Crear el curso con sus módulos y lecciones
      const course = await prisma.course.create({
        data: {
          title,
          description,
          price: price ? Number(price) : 0,
          image,
          instructorId: Number(instructorId),
          categoryId: categoryId ? Number(categoryId) : null,
          modules: {
            create: syllabus?.map((mod: any, mIndex: number) => ({
              title: mod.title || `Módulo ${mIndex + 1}`,
              order: mIndex,
              lessons: {
                create: mod.lessons?.map((les: any, lIndex: number) => ({
                  title: les.title || les || `Lección ${lIndex + 1}`,
                  type: les.type || 'video',
                  videoUrl: les.videoUrl || null,
                  order: lIndex
                }))
              }
            })) || []
          }
        },
        include: { modules: { include: { lessons: true } } }
      });
      
      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el curso' });
    }
  }

  static async enrollCourse(req: Request, res: Response) {
    try {
      const { id: courseId } = req.params;
      const userId = (req as any).user?.id;

      if (!userId) return res.status(401).json({ error: 'No autorizado' });

      let enrollment = await prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId: Number(courseId) } }
      });

      if (!enrollment) {
        enrollment = await prisma.enrollment.create({
          data: {
            userId,
            courseId: Number(courseId),
            progress: 0,
            isCompleted: false
          }
        });
      }
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ error: 'Error al inscribirse en el curso' });
    }
  }

  static async updateProgress(req: Request, res: Response) {
    try {
      const { id: courseId } = req.params;
      const { progress } = req.body;
      const userId = (req as any).user?.id;

      if (!userId) return res.status(401).json({ error: 'No autorizado' });

      const updated = await prisma.enrollment.update({
        where: { userId_courseId: { userId, courseId: Number(courseId) } },
        data: {
          progress: Number(progress),
          isCompleted: Number(progress) >= 100
        }
      });
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar progreso' });
    }
  }

  /**
   * @swagger
   * /api/courses/recommendations/ai:
   *   get:
   *     summary: Obtiene recomendaciones de cursos impulsadas por IA de forma silenciosa
   *     tags: [Courses]
   */
  static async getRecommendations(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: 'No autorizado' });

      // 1. Analizar inscripciones del usuario
      const enrollments = await prisma.enrollment.findMany({
        where: { userId: Number(userId) },
        include: { course: true }
      });

      const enrolledCourseIds = enrollments.map(e => e.courseId);

      // Si no tiene inscripciones, recomendar los más recientes
      if (enrollments.length === 0) {
        const recommendations = await prisma.course.findMany({
          take: 3,
          orderBy: { createdAt: 'desc' },
          include: { instructor: { select: { profile: true } } }
        });
        return res.json({
          reasoning: "Recomendación IA: Como eres nuevo, te sugerimos los cursos más recientes y populares de la plataforma.",
          courses: recommendations
        });
      }

      // 2. Extraer "intereses" basados en las categorías de sus cursos
      const categoryCounts: any = {};
      enrollments.forEach(e => {
        if (e.course.categoryId) {
          categoryCounts[e.course.categoryId] = (categoryCounts[e.course.categoryId] || 0) + 1;
        }
      });

      // 3. Encontrar la categoría favorita
      let favoriteCategoryId = null;
      let maxCount = 0;
      for (const catId in categoryCounts) {
        if (categoryCounts[catId] > maxCount) {
          maxCount = categoryCounts[catId];
          favoriteCategoryId = Number(catId);
        }
      }

      // 4. Buscar cursos de esa categoría (u otras) que no tenga
      let recommendations = [];
      let reasoning = "";

      if (favoriteCategoryId) {
        const category = await prisma.category.findUnique({ where: { id: favoriteCategoryId }});
        recommendations = await prisma.course.findMany({
          where: { 
            categoryId: favoriteCategoryId,
            id: { notIn: enrolledCourseIds }
          },
          take: 3,
          include: { instructor: { select: { profile: true } } }
        });
        
        reasoning = `Recomendación IA Silenciosa: Notamos que tienes un alto interés en la categoría '${category?.name || 'varios'}'. Creemos que estos cursos te ayudarán a potenciar ese perfil.`;
      }

      // Fallback si no hay suficientes en su categoría favorita
      if (recommendations.length === 0) {
        recommendations = await prisma.course.findMany({
          where: { id: { notIn: enrolledCourseIds } },
          take: 3,
          orderBy: { id: 'desc' },
          include: { instructor: { select: { profile: true } } }
        });
        reasoning = "Recomendación IA Silenciosa: Analizamos tu perfil de aprendizaje y preparamos estos cursos especiales para expandir tus horizontes.";
      }

      res.json({
        reasoning,
        courses: recommendations
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al generar recomendaciones de IA' });
    }
  }
}

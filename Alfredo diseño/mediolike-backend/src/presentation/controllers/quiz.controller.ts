import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class QuizController {
  
  /**
   * @swagger
   * /api/quizzes/{lessonId}:
   *   get:
   *     summary: Obtiene el examen asociado a una lección
   *     tags: [Quizzes]
   *     parameters:
   *       - in: path
   *         name: lessonId
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Examen con sus preguntas y respuestas (sin indicar cuál es correcta)
   */
  static async getQuizByLesson(req: Request, res: Response) {
    try {
      const { lessonId } = req.params;
      const quiz = await prisma.quiz.findUnique({
        where: { lessonId: Number(lessonId) },
        include: {
          questions: {
            include: {
              answers: {
                select: { id: true, text: true } // No enviamos el 'isCorrect' al frontend
              }
            }
          }
        }
      });
      
      if (!quiz) return res.status(404).json({ error: 'Examen no encontrado' });
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener examen' });
    }
  }

  /**
   * @swagger
   * /api/quizzes/{quizId}/submit:
   *   post:
   *     summary: Evalúa las respuestas enviadas por el alumno
   *     tags: [Quizzes]
   *     parameters:
   *       - in: path
   *         name: quizId
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               answers:
   *                 type: array
   *                 items:
   *                   type: integer
   *                 description: Array con los IDs de las respuestas seleccionadas
   *     responses:
   *       200:
   *         description: Resultado de la evaluación
   */
  static async submitQuiz(req: Request, res: Response) {
    try {
      const { quizId } = req.params;
      const { answers } = req.body; // Array de IDs de respuestas
      const userId = (req as any).user?.id;

      if (!userId) return res.status(401).json({ error: 'No autorizado' });

      // Obtener respuestas correctas de la DB
      const correctAnswers = await prisma.answer.findMany({
        where: {
          question: { quizId: Number(quizId) },
          isCorrect: true
        }
      });

      const correctIds = correctAnswers.map(a => a.id);
      
      let score = 0;
      answers.forEach((id: number) => {
        if (correctIds.includes(id)) {
          score++;
        }
      });

      const totalQuestions = await prisma.question.count({ where: { quizId: Number(quizId) } });
      const finalScore = (score / totalQuestions) * 100;
      const passed = finalScore >= 80; // Regla de negocio: 80% para pasar

      const attempt = await prisma.quizAttempt.create({
        data: {
          quizId: Number(quizId),
          userId: Number(userId),
          score: finalScore,
          passed
        }
      });

      res.json({ score: finalScore, passed, attemptId: attempt.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar examen' });
    }
  }
}

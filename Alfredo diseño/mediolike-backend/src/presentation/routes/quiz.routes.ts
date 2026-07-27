import { Router } from 'express';
import { QuizController } from '../controllers/quiz.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: API para gestión de Exámenes y Cuestionarios
 */

const router = Router();

router.get('/:lessonId', authMiddleware, QuizController.getQuizByLesson);
router.post('/:quizId/submit', authMiddleware, QuizController.submitQuiz);

export default router;

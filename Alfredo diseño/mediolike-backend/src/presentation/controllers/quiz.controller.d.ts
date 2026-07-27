import { Request, Response } from 'express';
export declare class QuizController {
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
    static getQuizByLesson(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
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
    static submitQuiz(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=quiz.controller.d.ts.map
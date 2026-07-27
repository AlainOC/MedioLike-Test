"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("../controllers/quiz.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: API para gestión de Exámenes y Cuestionarios
 */
const router = (0, express_1.Router)();
router.get('/:lessonId', auth_middleware_1.authMiddleware, quiz_controller_1.QuizController.getQuizByLesson);
router.post('/:quizId/submit', auth_middleware_1.authMiddleware, quiz_controller_1.QuizController.submitQuiz);
exports.default = router;
//# sourceMappingURL=quiz.routes.js.map
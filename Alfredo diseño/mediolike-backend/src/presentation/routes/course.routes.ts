import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/recommendations/ai', authMiddleware, CourseController.getRecommendations);
router.get('/:id', CourseController.getCourseById);
router.post('/', authMiddleware, CourseController.createCourse);

router.post('/:id/enroll', authMiddleware, CourseController.enrollCourse);
router.put('/:id/progress', authMiddleware, CourseController.updateProgress);

export default router;

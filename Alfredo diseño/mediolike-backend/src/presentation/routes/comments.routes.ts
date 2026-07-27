import { Router } from 'express';
import { getCommentsByCourse, createComment } from '../controllers/comments.controller';

const router = Router();

router.get('/course/:courseId', getCommentsByCourse);
router.post('/', createComment);

export default router;

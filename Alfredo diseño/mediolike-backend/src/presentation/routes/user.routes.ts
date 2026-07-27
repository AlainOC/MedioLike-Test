import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.get('/', authMiddleware, UserController.getAllUsers);
router.get('/me/enrollments', authMiddleware, UserController.getMyEnrollments);
router.put('/me/profile', authMiddleware, upload.single('avatar'), UserController.updateProfile);
router.put('/:id/role', authMiddleware, UserController.updateUserRole);

export default router;

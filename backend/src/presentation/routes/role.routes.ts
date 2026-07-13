import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';

const router = Router();

router.get('/', RoleController.getAll);
router.get('/:id', RoleController.getById);
router.post('/', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

// Permisos en roles
router.get('/:id/permissions', RoleController.getPermissions);
router.post('/:id/permissions', RoleController.assignPermissions);

export default router;

import { Router } from 'express';
import { SettingController } from '../controllers/setting.controller';

const router = Router();

router.get('/', SettingController.getAll);
router.get('/:key', SettingController.getByKey);
router.post('/', SettingController.create);
router.put('/:key', SettingController.update);
router.delete('/:key', SettingController.delete);

export default router;

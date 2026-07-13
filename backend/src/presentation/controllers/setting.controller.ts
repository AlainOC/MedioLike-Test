import { Request, Response } from 'express';
import { SettingService } from '../../application/services/setting.service';
import { PostgresSettingRepository } from '../../infrastructure/repositories/postgres-setting.repository';

const settingRepository = new PostgresSettingRepository();
const settingService = new SettingService(settingRepository);

export class SettingController {
    static async getAll(req: Request, res: Response) {
        try {
            const settings = await settingService.getAllSettings();
            res.json(settings);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getByKey(req: Request, res: Response) {
        try {
            const setting = await settingService.getSettingByKey(req.params.key as string);
            if (!setting) return res.status(404).json({ message: 'Setting not found' });
            res.json(setting);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const setting = await settingService.createSetting(req.body);
            res.status(201).json(setting);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { value } = req.body;
            if (!value) throw new Error('Value is required to update setting');
            const setting = await settingService.updateSetting(req.params.key as string, value);
            res.json(setting);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await settingService.deleteSetting(req.params.key as string);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

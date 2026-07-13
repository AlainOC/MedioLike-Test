"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingController = void 0;
const setting_service_1 = require("../../application/services/setting.service");
const postgres_setting_repository_1 = require("../../infrastructure/repositories/postgres-setting.repository");
const settingRepository = new postgres_setting_repository_1.PostgresSettingRepository();
const settingService = new setting_service_1.SettingService(settingRepository);
class SettingController {
    static async getAll(req, res) {
        try {
            const settings = await settingService.getAllSettings();
            res.json(settings);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getByKey(req, res) {
        try {
            const setting = await settingService.getSettingByKey(req.params.key);
            if (!setting)
                return res.status(404).json({ message: 'Setting not found' });
            res.json(setting);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async create(req, res) {
        try {
            const setting = await settingService.createSetting(req.body);
            res.status(201).json(setting);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const { value } = req.body;
            if (!value)
                throw new Error('Value is required to update setting');
            const setting = await settingService.updateSetting(req.params.key, value);
            res.json(setting);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            await settingService.deleteSetting(req.params.key);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.SettingController = SettingController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingService = void 0;
class SettingService {
    settingRepository;
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
    async getAllSettings() {
        return this.settingRepository.findAll();
    }
    async getSettingByKey(key) {
        return this.settingRepository.findByKey(key);
    }
    async createSetting(data) {
        if (!data.key || !data.value) {
            throw new Error("Key and value are required to create a setting");
        }
        const existing = await this.settingRepository.findByKey(data.key);
        if (existing) {
            throw new Error(`Setting key '${data.key}' already exists`);
        }
        return this.settingRepository.create(data);
    }
    async updateSetting(key, value) {
        return this.settingRepository.update(key, value);
    }
    async deleteSetting(key) {
        return this.settingRepository.delete(key);
    }
}
exports.SettingService = SettingService;

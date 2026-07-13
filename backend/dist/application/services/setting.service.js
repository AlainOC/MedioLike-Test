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

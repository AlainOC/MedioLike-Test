import { SettingRepository } from '../../domain/repositories/setting.repository';
import { Setting } from '../../domain/entities/setting.entity';

export class SettingService {
    constructor(private readonly settingRepository: SettingRepository) { }

    async getAllSettings(): Promise<Setting[]> {
        return this.settingRepository.findAll();
    }

    async getSettingByKey(key: string): Promise<Setting | null> {
        return this.settingRepository.findByKey(key);
    }

    async createSetting(data: Omit<Setting, 'id' | 'createdAt' | 'updatedAt'>): Promise<Setting> {
        if (!data.key || !data.value) {
            throw new Error("Key and value are required to create a setting");
        }
        const existing = await this.settingRepository.findByKey(data.key);
        if (existing) {
            throw new Error(`Setting key '${data.key}' already exists`);
        }
        return this.settingRepository.create(data);
    }

    async updateSetting(key: string, value: string): Promise<Setting> {
        return this.settingRepository.update(key, value);
    }

    async deleteSetting(key: string): Promise<void> {
        return this.settingRepository.delete(key);
    }
}

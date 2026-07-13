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
        return this.settingRepository.create(data);
    }

    async updateSetting(key: string, value: string): Promise<Setting> {
        return this.settingRepository.update(key, value);
    }

    async deleteSetting(key: string): Promise<void> {
        return this.settingRepository.delete(key);
    }
}

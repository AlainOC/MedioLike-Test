import { Setting } from '../entities/setting.entity';

export interface SettingRepository {
    findByKey(key: string): Promise<Setting | null>;
    findAll(): Promise<Setting[]>;
    create(setting: Omit<Setting, 'id' | 'createdAt' | 'updatedAt'>): Promise<Setting>;
    update(key: string, value: string): Promise<Setting>;
    delete(key: string): Promise<void>;
}

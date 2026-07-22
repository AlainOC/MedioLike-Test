import { SettingService } from './setting.service';
import { SettingRepository } from '../../domain/repositories/setting.repository';
import { Setting } from '../../domain/entities/setting.entity';

describe('SettingService Unit Test Suite', () => {
    let mockSettingRepository: jest.Mocked<SettingRepository>;
    let settingService: SettingService;

    beforeEach(() => {
        mockSettingRepository = {
            findByKey: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<SettingRepository>;

        settingService = new SettingService(mockSettingRepository);
    });

    test('should enforce creation with required fields', async () => {
        await expect(settingService.createSetting({ key: '', value: 'test', valueType: 'string', description: '' }))
            .rejects
            .toThrow("Key and value are required to create a setting");
    });

    test('should prevent duplicate configuration keys from being inserted', async () => {
        mockSettingRepository.findByKey.mockResolvedValueOnce({
            id: 's1', key: 'TIMEZONE', value: 'UTC', valueType: 'string',
            description: '', createdAt: new Date(), updatedAt: new Date()
        });

        await expect(settingService.createSetting({ key: 'TIMEZONE', value: 'EST', valueType: 'string', description: '' }))
            .rejects
            .toThrow("Setting key 'TIMEZONE' already exists");
    });
});

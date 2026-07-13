import { RoleService } from './role.service';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { Role } from '../../domain/entities/role.entity';

describe('RoleService', () => {
    let mockRoleRepository: jest.Mocked<RoleRepository>;
    let roleService: RoleService;

    beforeEach(() => {
        mockRoleRepository = {
            findById: jest.fn(),
            findByName: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            assignPermissions: jest.fn(),
            getPermissions: jest.fn()
        } as jest.Mocked<RoleRepository>;

        roleService = new RoleService(mockRoleRepository);
    });

    test('should fetch all roles', async () => {
        const fakeRoles: Role[] = [{ id: '1', name: 'Admin', description: '', createdAt: new Date(), updatedAt: new Date() }];
        mockRoleRepository.findAll.mockResolvedValueOnce(fakeRoles);

        const roles = await roleService.getAllRoles();
        expect(roles).toEqual(fakeRoles);
        expect(mockRoleRepository.findAll).toHaveBeenCalledTimes(1);
    });

    test('should prevent creating a role if the name already exists', async () => {
        mockRoleRepository.findByName.mockResolvedValueOnce({
            id: '1', name: 'Admin', description: null, createdAt: new Date(), updatedAt: new Date()
        });

        await expect(roleService.createRole({ name: 'Admin', description: 'Testing' }))
            .rejects
            .toThrow("Role name 'Admin' already exists.");

        expect(mockRoleRepository.create).not.toHaveBeenCalled();
    });
});

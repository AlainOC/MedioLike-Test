import { RoleRepository } from '../../domain/repositories/role.repository';
import { Role, Permission } from '../../domain/entities/role.entity';

export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) { }

    async getAllRoles(): Promise<Role[]> {
        return this.roleRepository.findAll();
    }

    async getRoleById(id: string): Promise<Role | null> {
        return this.roleRepository.findById(id);
    }

    async createRole(data: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
        const exists = await this.roleRepository.findByName(data.name);
        if (exists) throw new Error(`Role name '${data.name}' already exists.`);
        return this.roleRepository.create(data);
    }

    async updateRole(id: string, data: Partial<Role>): Promise<Role> {
        return this.roleRepository.update(id, data);
    }

    async deleteRole(id: string): Promise<void> {
        return this.roleRepository.delete(id);
    }

    async assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<void> {
        return this.roleRepository.assignPermissions(roleId, permissionIds);
    }

    async getRolePermissions(roleId: string): Promise<Permission[]> {
        return this.roleRepository.getPermissions(roleId);
    }
}

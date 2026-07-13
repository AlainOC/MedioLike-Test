import { Role, Permission } from '../entities/role.entity';

export interface RoleRepository {
    findById(id: string): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    findAll(): Promise<Role[]>;
    create(role: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role>;
    update(id: string, role: Partial<Role>): Promise<Role>;
    delete(id: string): Promise<void>;
    assignPermissions(roleId: string, permissionIds: string[]): Promise<void>;
    getPermissions(roleId: string): Promise<Permission[]>;
}

export interface PermissionRepository {
    findById(id: string): Promise<Permission | null>;
    findAll(): Promise<Permission[]>;
}

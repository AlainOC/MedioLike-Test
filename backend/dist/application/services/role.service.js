"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
class RoleService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async getAllRoles() {
        return this.roleRepository.findAll();
    }
    async getRoleById(id) {
        return this.roleRepository.findById(id);
    }
    async createRole(data) {
        const exists = await this.roleRepository.findByName(data.name);
        if (exists)
            throw new Error(`Role name '${data.name}' already exists.`);
        return this.roleRepository.create(data);
    }
    async updateRole(id, data) {
        return this.roleRepository.update(id, data);
    }
    async deleteRole(id) {
        return this.roleRepository.delete(id);
    }
    async assignPermissionsToRole(roleId, permissionIds) {
        return this.roleRepository.assignPermissions(roleId, permissionIds);
    }
    async getRolePermissions(roleId) {
        return this.roleRepository.getPermissions(roleId);
    }
}
exports.RoleService = RoleService;

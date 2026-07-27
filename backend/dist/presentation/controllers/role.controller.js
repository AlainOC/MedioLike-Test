"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const role_service_1 = require("../../application/services/role.service");
const postgres_role_repository_1 = require("../../infrastructure/repositories/postgres-role.repository");
const roleRepository = new postgres_role_repository_1.PostgresRoleRepository();
const roleService = new role_service_1.RoleService(roleRepository);
class RoleController {
    static async getAll(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            res.json(roles);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const role = await roleService.getRoleById(req.params.id);
            if (!role)
                return res.status(404).json({ message: 'Role not found' });
            res.json(role);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async create(req, res) {
        try {
            const role = await roleService.createRole(req.body);
            res.status(201).json(role);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const role = await roleService.updateRole(req.params.id, req.body);
            res.json(role);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            await roleService.deleteRole(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async assignPermissions(req, res) {
        try {
            const { permissionIds } = req.body;
            if (!Array.isArray(permissionIds)) {
                return res.status(400).json({ message: 'permissionIds must be an array of UUIDs' });
            }
            await roleService.assignPermissionsToRole(req.params.id, permissionIds);
            res.json({ message: 'Permissions assigned successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getPermissions(req, res) {
        try {
            const permissions = await roleService.getRolePermissions(req.params.id);
            res.json(permissions);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.RoleController = RoleController;

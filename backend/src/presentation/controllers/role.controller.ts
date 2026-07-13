import { Request, Response } from 'express';
import { RoleService } from '../../application/services/role.service';
import { PostgresRoleRepository } from '../../infrastructure/repositories/postgres-role.repository';

const roleRepository = new PostgresRoleRepository();
const roleService = new RoleService(roleRepository);

export class RoleController {
    static async getAll(req: Request, res: Response) {
        try {
            const roles = await roleService.getAllRoles();
            res.json(roles);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const role = await roleService.getRoleById(req.params.id as string);
            if (!role) return res.status(404).json({ message: 'Role not found' });
            res.json(role);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const role = await roleService.createRole(req.body);
            res.status(201).json(role);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const role = await roleService.updateRole(req.params.id as string, req.body);
            res.json(role);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await roleService.deleteRole(req.params.id as string);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async assignPermissions(req: Request, res: Response) {
        try {
            const { permissionIds } = req.body;
            if (!Array.isArray(permissionIds)) {
                return res.status(400).json({ message: 'permissionIds must be an array of UUIDs' });
            }
            await roleService.assignPermissionsToRole(req.params.id as string, permissionIds);
            res.json({ message: 'Permissions assigned successfully' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPermissions(req: Request, res: Response) {
        try {
            const permissions = await roleService.getRolePermissions(req.params.id as string);
            res.json(permissions);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

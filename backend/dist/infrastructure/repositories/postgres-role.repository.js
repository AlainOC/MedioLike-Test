"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresRoleRepository = void 0;
const postgres_1 = require("../database/postgres");
class PostgresRoleRepository {
    pool;
    constructor() {
        this.pool = postgres_1.db.getPool();
    }
    async findById(id) {
        const result = await this.pool.query('SELECT * FROM roles WHERE id = $1', [id]);
        return result.rows.length ? this.mapRowToRole(result.rows[0]) : null;
    }
    async findByName(name) {
        const result = await this.pool.query('SELECT * FROM roles WHERE name = $1', [name]);
        return result.rows.length ? this.mapRowToRole(result.rows[0]) : null;
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM roles ORDER BY created_at ASC');
        return result.rows.map(this.mapRowToRole);
    }
    async create(role) {
        const result = await this.pool.query('INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *', [role.name, role.description]);
        return this.mapRowToRole(result.rows[0]);
    }
    async update(id, role) {
        const result = await this.pool.query('UPDATE roles SET name = COALESCE($1, name), description = COALESCE($2, description), updated_at = NOW() WHERE id = $3 RETURNING *', [role.name, role.description, id]);
        if (result.rows.length === 0)
            throw new Error('Role not found');
        return this.mapRowToRole(result.rows[0]);
    }
    async delete(id) {
        await this.pool.query('DELETE FROM roles WHERE id = $1', [id]);
    }
    async assignPermissions(roleId, permissionIds) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            // Remove old permissions
            await client.query('DELETE FROM role_permissions WHERE role_id = $1', [roleId]);
            // Insert new ones
            for (const pId of permissionIds) {
                await client.query('INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2)', [roleId, pId]);
            }
            await client.query('COMMIT');
        }
        catch (e) {
            await client.query('ROLLBACK');
            throw e;
        }
        finally {
            client.release();
        }
    }
    async getPermissions(roleId) {
        const result = await this.pool.query(`SELECT p.* FROM permissions p 
             INNER JOIN role_permissions rp ON p.id = rp.permission_id 
             WHERE rp.role_id = $1`, [roleId]);
        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        }));
    }
    mapRowToRole(row) {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }
}
exports.PostgresRoleRepository = PostgresRoleRepository;

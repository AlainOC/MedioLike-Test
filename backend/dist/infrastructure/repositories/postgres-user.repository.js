"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const postgres_1 = require("../database/postgres");
class PostgresUserRepository {
    pool;
    constructor() {
        this.pool = postgres_1.db.getPool();
    }
    async findById(id) {
        const result = await this.pool.query('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
    }
    async findByEmail(email) {
        const result = await this.pool.query('SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL', [email]);
        return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
    }
    async findAll(limit, offset) {
        const result = await this.pool.query('SELECT * FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
        return result.rows.map(this.mapRowToUser);
    }
    async create(user) {
        const { email, passwordHash, status, roleId, emailVerifiedAt, lastLoginAt } = user;
        const result = await this.pool.query(`INSERT INTO users (email, password_hash, status, role_id, email_verified_at, last_login_at) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [email, passwordHash, status, roleId, emailVerifiedAt, lastLoginAt]);
        return this.mapRowToUser(result.rows[0]);
    }
    async update(id, user) {
        const fields = [];
        const values = [];
        let index = 1;
        if (user.email) {
            fields.push(`email = $${index++}`);
            values.push(user.email);
        }
        if (user.status) {
            fields.push(`status = $${index++}`);
            values.push(user.status);
        }
        if (user.passwordHash) {
            fields.push(`password_hash = $${index++}`);
            values.push(user.passwordHash);
        }
        if (user.roleId) {
            fields.push(`role_id = $${index++}`);
            values.push(user.roleId);
        }
        fields.push(`updated_at = NOW()`);
        values.push(id);
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} AND deleted_at IS NULL RETURNING *`;
        const result = await this.pool.query(query, values);
        if (result.rows.length === 0)
            throw new Error('User not found or deleted');
        return this.mapRowToUser(result.rows[0]);
    }
    async delete(id) {
        // Soft delete implementation
        await this.pool.query('UPDATE users SET deleted_at = NOW() WHERE id = $1', [id]);
    }
    mapRowToUser(row) {
        return {
            id: row.id,
            email: row.email,
            passwordHash: row.password_hash,
            status: row.status,
            roleId: row.role_id,
            emailVerifiedAt: row.email_verified_at,
            lastLoginAt: row.last_login_at,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at
        };
    }
}
exports.PostgresUserRepository = PostgresUserRepository;

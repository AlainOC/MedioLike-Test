import { Pool } from 'pg';
import { User, UserStatus } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { db } from '../database/postgres';

export class PostgresUserRepository implements UserRepository {
    private pool: Pool;

    constructor() {
        this.pool = db.getPool();
    }

    async findById(id: string): Promise<User | null> {
        const result = await this.pool.query('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id]);
        return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.pool.query('SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL', [email]);
        return result.rows.length ? this.mapRowToUser(result.rows[0]) : null;
    }

    async findAll(limit: number, offset: number): Promise<User[]> {
        const result = await this.pool.query(
            'SELECT * FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );
        return result.rows.map(this.mapRowToUser);
    }

    async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User> {
        const { email, passwordHash, status, roleId, emailVerifiedAt, lastLoginAt } = user;
        const result = await this.pool.query(
            `INSERT INTO users (email, password_hash, status, role_id, email_verified_at, last_login_at) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [email, passwordHash, status, roleId, emailVerifiedAt, lastLoginAt]
        );
        return this.mapRowToUser(result.rows[0]);
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        const fields = [];
        const values = [];
        let index = 1;

        if (user.email) { fields.push(`email = $${index++}`); values.push(user.email); }
        if (user.status) { fields.push(`status = $${index++}`); values.push(user.status); }
        if (user.passwordHash) { fields.push(`password_hash = $${index++}`); values.push(user.passwordHash); }
        if (user.roleId) { fields.push(`role_id = $${index++}`); values.push(user.roleId); }

        fields.push(`updated_at = NOW()`);

        values.push(id);
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} AND deleted_at IS NULL RETURNING *`;

        const result = await this.pool.query(query, values);
        if (result.rows.length === 0) throw new Error('User not found or deleted');
        return this.mapRowToUser(result.rows[0]);
    }

    async delete(id: string): Promise<void> {
        // Soft delete implementation
        await this.pool.query('UPDATE users SET deleted_at = NOW() WHERE id = $1', [id]);
    }

    private mapRowToUser(row: any): User {
        return {
            id: row.id,
            email: row.email,
            passwordHash: row.password_hash,
            status: row.status as UserStatus,
            roleId: row.role_id,
            emailVerifiedAt: row.email_verified_at,
            lastLoginAt: row.last_login_at,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at
        };
    }
}

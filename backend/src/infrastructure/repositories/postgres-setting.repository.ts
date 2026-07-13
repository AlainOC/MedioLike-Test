import { Pool } from 'pg';
import { Setting } from '../../domain/entities/setting.entity';
import { SettingRepository } from '../../domain/repositories/setting.repository';
import { db } from '../database/postgres';

export class PostgresSettingRepository implements SettingRepository {
    private pool: Pool;

    constructor() {
        this.pool = db.getPool();
    }

    async findByKey(key: string): Promise<Setting | null> {
        const result = await this.pool.query('SELECT * FROM settings WHERE key = $1', [key]);
        return result.rows.length ? this.mapRowToSetting(result.rows[0]) : null;
    }

    async findAll(): Promise<Setting[]> {
        const result = await this.pool.query('SELECT * FROM settings ORDER BY key ASC');
        return result.rows.map(this.mapRowToSetting);
    }

    async create(setting: Omit<Setting, 'id' | 'createdAt' | 'updatedAt'>): Promise<Setting> {
        const { key, value, valueType, description } = setting;
        const result = await this.pool.query(
            `INSERT INTO settings (key, value, value_type, description) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [key, value, valueType, description]
        );
        return this.mapRowToSetting(result.rows[0]);
    }

    async update(key: string, value: string): Promise<Setting> {
        const result = await this.pool.query(
            `UPDATE settings SET value = $1, updated_at = NOW() WHERE key = $2 RETURNING *`,
            [value, key]
        );
        if (result.rows.length === 0) throw new Error('Setting not found');
        return this.mapRowToSetting(result.rows[0]);
    }

    async delete(key: string): Promise<void> {
        await this.pool.query('DELETE FROM settings WHERE key = $1', [key]);
    }

    private mapRowToSetting(row: any): Setting {
        return {
            id: row.id,
            key: row.key,
            value: row.value,
            valueType: row.value_type,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at
        };
    }
}

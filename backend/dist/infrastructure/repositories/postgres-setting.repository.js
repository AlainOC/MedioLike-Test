"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSettingRepository = void 0;
const postgres_1 = require("../database/postgres");
class PostgresSettingRepository {
    pool;
    constructor() {
        this.pool = postgres_1.db.getPool();
    }
    async findByKey(key) {
        const result = await this.pool.query('SELECT * FROM settings WHERE key = $1', [key]);
        return result.rows.length ? this.mapRowToSetting(result.rows[0]) : null;
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM settings ORDER BY key ASC');
        return result.rows.map(this.mapRowToSetting);
    }
    async create(setting) {
        const { key, value, valueType, description } = setting;
        const result = await this.pool.query(`INSERT INTO settings (key, value, value_type, description) 
             VALUES ($1, $2, $3, $4) RETURNING *`, [key, value, valueType, description]);
        return this.mapRowToSetting(result.rows[0]);
    }
    async update(key, value) {
        const result = await this.pool.query(`UPDATE settings SET value = $1, updated_at = NOW() WHERE key = $2 RETURNING *`, [value, key]);
        if (result.rows.length === 0)
            throw new Error('Setting not found');
        return this.mapRowToSetting(result.rows[0]);
    }
    async delete(key) {
        await this.pool.query('DELETE FROM settings WHERE key = $1', [key]);
    }
    mapRowToSetting(row) {
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
exports.PostgresSettingRepository = PostgresSettingRepository;

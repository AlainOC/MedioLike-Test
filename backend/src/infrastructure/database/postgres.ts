import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

class PostgresDatabase {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER || 'mediolike',
            host: process.env.DB_HOST || 'localhost',
            database: process.env.DB_NAME || 'mediolike_db',
            password: process.env.DB_PASSWORD || 'secretpassword',
            port: Number(process.env.DB_PORT) || 5432,
        });
    }

    public async connect(): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('SELECT 1');
        } finally {
            client.release();
        }
    }

    public getPool(): Pool {
        return this.pool;
    }
}

export const db = new PostgresDatabase();

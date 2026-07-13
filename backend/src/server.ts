import app from './app';
import * as dotenv from 'dotenv';
import { db } from './infrastructure/database/postgres';

dotenv.config();

const port = process.env.PORT || 3000;

async function bootstrap() {
    try {
        await db.connect();
        console.log('✅ Connected to PostgreSQL');
        app.listen(port, () => {
            console.log(`🚀 Server executing on port: ${port}`);
        });
    } catch (error) {
        console.error('❌ Database connection failed', error);
        process.exit(1);
    }
}

bootstrap();

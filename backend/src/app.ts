import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './presentation/routes/user.routes';
import settingRoutes from './presentation/routes/setting.routes';
import roleRoutes from './presentation/routes/role.routes';
import { setupSwagger } from './docs/swagger';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        setupSwagger(this.app);
    }

    protected routes(): void {
        this.app.get('/api/health', (req, res) => {
            res.status(200).send({ status: 'ok', environment: process.env.NODE_ENV });
        });

        // Modules
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/settings', settingRoutes);
        this.app.use('/api/roles', roleRoutes);
    }
}

export default new App().app;

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mediolike API - Administración y Seguridad',
            version: '1.0.0',
            description: 'Documentación de los endpoints de Administración y Seguridad (Sprint 2)'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local (Desarrollo)'
            }
        ]
    },
    apis: ['./src/presentation/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

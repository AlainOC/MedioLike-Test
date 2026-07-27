import express from 'express';
import cors from 'cors';
import path from 'path';

import uploadRoutes from './presentation/routes/upload.routes';
import courseRoutes from './presentation/routes/course.routes';
import authRoutes from './presentation/routes/auth.routes';
import commentsRoutes from './presentation/routes/comments.routes';
import userRoutes from './presentation/routes/user.routes';
import eventRoutes from './presentation/routes/event.routes';
import quizRoutes from './presentation/routes/quiz.routes';
import notificationRoutes from './presentation/routes/notification.routes';
import paymentRoutes from './presentation/routes/payment.routes';
import { setupSwagger } from './swagger';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir la carpeta uploads estáticamente para las imágenes y videos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mediolike Backend is running!' });
});

// Swagger Documentación
setupSwagger(app);

export default app;

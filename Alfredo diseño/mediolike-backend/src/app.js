"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const upload_routes_1 = __importDefault(require("./presentation/routes/upload.routes"));
const course_routes_1 = __importDefault(require("./presentation/routes/course.routes"));
const auth_routes_1 = __importDefault(require("./presentation/routes/auth.routes"));
const comments_routes_1 = __importDefault(require("./presentation/routes/comments.routes"));
const user_routes_1 = __importDefault(require("./presentation/routes/user.routes"));
const event_routes_1 = __importDefault(require("./presentation/routes/event.routes"));
const quiz_routes_1 = __importDefault(require("./presentation/routes/quiz.routes"));
const notification_routes_1 = __importDefault(require("./presentation/routes/notification.routes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Servir la carpeta uploads estáticamente para las imágenes y videos
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Rutas API
app.use('/api/auth', auth_routes_1.default);
app.use('/api/upload', upload_routes_1.default);
app.use('/api/courses', course_routes_1.default);
app.use('/api/comments', comments_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/events', event_routes_1.default);
app.use('/api/quizzes', quiz_routes_1.default);
app.use('/api/notifications', notification_routes_1.default);
// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Mediolike Backend is running!' });
});
// Swagger Documentación
(0, swagger_1.setupSwagger)(app);
exports.default = app;
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./presentation/routes/user.routes"));
const setting_routes_1 = __importDefault(require("./presentation/routes/setting.routes"));
const swagger_1 = require("./docs/swagger");
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        (0, swagger_1.setupSwagger)(this.app);
    }
    routes() {
        this.app.get('/api/health', (req, res) => {
            res.status(200).send({ status: 'ok', environment: process.env.NODE_ENV });
        });
        // Modules
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/settings', setting_routes_1.default);
    }
}
exports.default = new App().app;

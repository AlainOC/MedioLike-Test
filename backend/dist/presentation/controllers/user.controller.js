"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../../application/services/user.service");
const postgres_user_repository_1 = require("../../infrastructure/repositories/postgres-user.repository");
// Dependency Injection manual simple
const userRepository = new postgres_user_repository_1.PostgresUserRepository();
const userService = new user_service_1.UserService(userRepository);
class UserController {
    static async getAll(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 50;
            const offset = parseInt(req.query.offset) || 0;
            const users = await userService.getAllUsers(limit, offset);
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async create(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async update(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async delete(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;

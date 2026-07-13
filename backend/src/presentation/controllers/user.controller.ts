import { Request, Response } from 'express';
import { UserService } from '../../application/services/user.service';
import { PostgresUserRepository } from '../../infrastructure/repositories/postgres-user.repository';

// Dependency Injection manual simple
const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);

export class UserController {
    static async getAll(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string) || 50;
            const offset = parseInt(req.query.offset as string) || 0;
            const users = await userService.getAllUsers(limit, offset);
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const user = await userService.getUserById(req.params.id as string);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const user = await userService.updateUser(req.params.id as string, req.body);
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            await userService.deleteUser(req.params.id as string);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

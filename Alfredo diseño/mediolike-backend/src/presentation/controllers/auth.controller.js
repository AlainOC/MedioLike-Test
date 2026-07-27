"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_12345';
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
                profile: true
            }
        });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: user.role.name
        }, JWT_SECRET, { expiresIn: '24h' });
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role_name: user.role.name,
                profile: user.profile
            }
        });
    }
    catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, roleName } = req.body;
        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        // Default role to Participant if not provided
        const targetRoleName = roleName || 'Participant';
        const role = await prisma.role.findUnique({ where: { name: targetRoleName } });
        if (!role) {
            return res.status(400).json({ message: 'El rol especificado no existe' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                roleId: role.id,
                profile: {
                    create: {
                        firstName,
                        lastName
                    }
                }
            },
            include: {
                role: true,
                profile: true
            }
        });
        const token = jsonwebtoken_1.default.sign({
            userId: newUser.id,
            role: newUser.role.name
        }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                role_name: newUser.role.name,
                profile: newUser.profile
            }
        });
    }
    catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
exports.register = register;
//# sourceMappingURL=auth.controller.js.map
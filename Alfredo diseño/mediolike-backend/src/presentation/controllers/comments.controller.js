"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getCommentsByCourse = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCommentsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const comments = await prisma.comment.findMany({
            where: { courseId: Number(courseId) },
            include: {
                user: {
                    select: {
                        email: true,
                        role: { select: { name: true } },
                        profile: { select: { firstName: true, lastName: true, avatarUrl: true } }
                    }
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        res.json(comments);
    }
    catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error fetching comments' });
    }
};
exports.getCommentsByCourse = getCommentsByCourse;
const createComment = async (req, res) => {
    try {
        const { text, courseId, userId } = req.body;
        if (!text || !courseId || !userId) {
            return res.status(400).json({ message: 'Text, courseId, and userId are required' });
        }
        const comment = await prisma.comment.create({
            data: {
                text,
                courseId: Number(courseId),
                userId: Number(userId)
            },
            include: {
                user: {
                    select: {
                        email: true,
                        role: { select: { name: true } },
                        profile: { select: { firstName: true, lastName: true, avatarUrl: true } }
                    }
                }
            }
        });
        res.status(201).json(comment);
    }
    catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Error creating comment' });
    }
};
exports.createComment = createComment;
//# sourceMappingURL=comments.controller.js.map
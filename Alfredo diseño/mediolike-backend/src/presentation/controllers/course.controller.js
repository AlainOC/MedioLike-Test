"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CourseController {
    static async getAllCourses(req, res) {
        try {
            const courses = await prisma.course.findMany({
                include: {
                    instructor: { select: { profile: true } },
                    category: true,
                    modules: { include: { lessons: true } }
                }
            });
            res.json(courses);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener los cursos' });
        }
    }
    static async getCourseById(req, res) {
        try {
            const { id } = req.params;
            const course = await prisma.course.findUnique({
                where: { id: Number(id) },
                include: {
                    instructor: { select: { profile: true } },
                    category: true,
                    modules: { include: { lessons: true } }
                }
            });
            if (!course)
                return res.status(404).json({ error: 'Curso no encontrado' });
            res.json(course);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al obtener el curso' });
        }
    }
    static async createCourse(req, res) {
        try {
            const { title, description, price, image, categoryId, syllabus } = req.body;
            const instructorId = req.user?.id;
            if (!instructorId) {
                return res.status(401).json({ error: 'No autorizado. Se requiere ser instructor.' });
            }
            // Crear el curso con sus módulos y lecciones
            const course = await prisma.course.create({
                data: {
                    title,
                    description,
                    price: price ? Number(price) : 0,
                    image,
                    instructorId: Number(instructorId),
                    categoryId: categoryId ? Number(categoryId) : null,
                    modules: {
                        create: syllabus?.map((mod, mIndex) => ({
                            title: mod.title || `Módulo ${mIndex + 1}`,
                            order: mIndex,
                            lessons: {
                                create: mod.lessons?.map((les, lIndex) => ({
                                    title: les.title || les || `Lección ${lIndex + 1}`,
                                    type: les.type || 'video',
                                    videoUrl: les.videoUrl || null,
                                    order: lIndex
                                }))
                            }
                        })) || []
                    }
                },
                include: { modules: { include: { lessons: true } } }
            });
            res.status(201).json(course);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el curso' });
        }
    }
    static async enrollCourse(req, res) {
        try {
            const { id: courseId } = req.params;
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ error: 'No autorizado' });
            let enrollment = await prisma.enrollment.findUnique({
                where: { userId_courseId: { userId, courseId: Number(courseId) } }
            });
            if (!enrollment) {
                enrollment = await prisma.enrollment.create({
                    data: {
                        userId,
                        courseId: Number(courseId),
                        progress: 0,
                        isCompleted: false
                    }
                });
            }
            res.json(enrollment);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al inscribirse en el curso' });
        }
    }
    static async updateProgress(req, res) {
        try {
            const { id: courseId } = req.params;
            const { progress } = req.body;
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ error: 'No autorizado' });
            const updated = await prisma.enrollment.update({
                where: { userId_courseId: { userId, courseId: Number(courseId) } },
                data: {
                    progress: Number(progress),
                    isCompleted: Number(progress) >= 100
                }
            });
            res.json(updated);
        }
        catch (error) {
            res.status(500).json({ error: 'Error al actualizar progreso' });
        }
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map
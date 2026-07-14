"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// In-Memory Database State
let categories = [
    {
        id: '1',
        name: 'Development',
        description: 'Web and software development courses, including frontend, backend, and fullstack.',
        slug: 'development'
    },
    {
        id: '2',
        name: 'Design',
        description: 'UI/UX design, graphic design, design systems, and product prototyping.',
        slug: 'design'
    },
    {
        id: '3',
        name: 'Marketing',
        description: 'Digital marketing, search engine optimization (SEO), social media strategy, and growth hacking.',
        slug: 'marketing'
    }
];
let instructors = [
    {
        id: '1',
        name: 'John Doe',
        bio: 'Senior Full Stack Developer with 10+ years of experience in JavaScript, Node.js, and React. Passionate about teaching clean code.',
        specialty: 'Web Development',
        photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'
    },
    {
        id: '2',
        name: 'Jane Smith',
        bio: 'Lead Product Designer at a Fortune 500 company. Specializes in accessible design, user research, and interactive prototyping.',
        specialty: 'UI/UX Design',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    }
];
// Helper to generate unique IDs
const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 5);
// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'up',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// ==========================================
// CATEGORIES ENDPOINTS
// ==========================================
// GET /api/categories - List all categories
app.get('/api/categories', (req, res) => {
    res.status(200).json(categories);
});
// GET /api/categories/:id - Get single category by ID
app.get('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const category = categories.find((c) => c.id === id);
    if (!category) {
        res.status(404).json({ error: `Category with ID ${id} not found` });
        return;
    }
    res.status(200).json(category);
});
// POST /api/categories - Create a new category
app.post('/api/categories', (req, res) => {
    const { name, description, slug } = req.body;
    if (!name || !description || !slug) {
        res.status(400).json({ error: 'Fields "name", "description", and "slug" are required' });
        return;
    }
    const newCategory = {
        id: generateId(),
        name,
        description,
        slug
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});
// PUT /api/categories/:id - Update an existing category
app.put('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, slug } = req.body;
    const categoryIndex = categories.findIndex((c) => c.id === id);
    if (categoryIndex === -1) {
        res.status(404).json({ error: `Category with ID ${id} not found` });
        return;
    }
    // Update fields if provided
    const updatedCategory = {
        ...categories[categoryIndex],
        ...(name && { name }),
        ...(description && { description }),
        ...(slug && { slug })
    };
    categories[categoryIndex] = updatedCategory;
    res.status(200).json(updatedCategory);
});
// DELETE /api/categories/:id - Delete a category by ID
app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex((c) => c.id === id);
    if (categoryIndex === -1) {
        res.status(404).json({ error: `Category with ID ${id} not found` });
        return;
    }
    const deletedCategory = categories.splice(categoryIndex, 1)[0];
    res.status(200).json({ message: `Category '${deletedCategory.name}' deleted successfully` });
});
// ==========================================
// INSTRUCTORS ENDPOINTS
// ==========================================
// GET /api/instructors - List all instructors
app.get('/api/instructors', (req, res) => {
    res.status(200).json(instructors);
});
// GET /api/instructors/:id - Get single instructor by ID
app.get('/api/instructors/:id', (req, res) => {
    const { id } = req.params;
    const instructor = instructors.find((i) => i.id === id);
    if (!instructor) {
        res.status(404).json({ error: `Instructor with ID ${id} not found` });
        return;
    }
    res.status(200).json(instructor);
});
// POST /api/instructors - Create a new instructor
app.post('/api/instructors', (req, res) => {
    const { name, bio, specialty, photoUrl } = req.body;
    if (!name || !bio || !specialty || !photoUrl) {
        res.status(400).json({ error: 'Fields "name", "bio", "specialty", and "photoUrl" are required' });
        return;
    }
    const newInstructor = {
        id: generateId(),
        name,
        bio,
        specialty,
        photoUrl
    };
    instructors.push(newInstructor);
    res.status(201).json(newInstructor);
});
// PUT /api/instructors/:id - Update an existing instructor
app.put('/api/instructors/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio, specialty, photoUrl } = req.body;
    const instructorIndex = instructors.findIndex((i) => i.id === id);
    if (instructorIndex === -1) {
        res.status(404).json({ error: `Instructor with ID ${id} not found` });
        return;
    }
    // Update fields if provided
    const updatedInstructor = {
        ...instructors[instructorIndex],
        ...(name && { name }),
        ...(bio && { bio }),
        ...(specialty && { specialty }),
        ...(photoUrl && { photoUrl })
    };
    instructors[instructorIndex] = updatedInstructor;
    res.status(200).json(updatedInstructor);
});
// DELETE /api/instructors/:id - Delete an instructor by ID
app.delete('/api/instructors/:id', (req, res) => {
    const { id } = req.params;
    const instructorIndex = instructors.findIndex((i) => i.id === id);
    if (instructorIndex === -1) {
        res.status(404).json({ error: `Instructor with ID ${id} not found` });
        return;
    }
    const deletedInstructor = instructors.splice(instructorIndex, 1)[0];
    res.status(200).json({ message: `Instructor '${deletedInstructor.name}' deleted successfully` });
});
// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📁 Categories API: http://localhost:${PORT}/api/categories`);
    console.log(`👨‍🏫 Instructors API: http://localhost:${PORT}/api/instructors`);
});

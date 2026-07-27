"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding database...');
    // Roles
    const adminRole = await prisma.role.upsert({
        where: { name: 'Admin' },
        update: {},
        create: { name: 'Admin', description: 'Administrador total del sistema' }
    });
    const instructorRole = await prisma.role.upsert({
        where: { name: 'Instructor' },
        update: {},
        create: { name: 'Instructor', description: 'Puede crear y editar cursos' }
    });
    const participantRole = await prisma.role.upsert({
        where: { name: 'Participant' },
        update: {},
        create: { name: 'Participant', description: 'Estudiante normal' }
    });
    // Categorías
    const cats = ['Programación', 'Diseño UX', 'Marketing', 'Finanzas', 'Idiomas'];
    for (const c of cats) {
        await prisma.category.upsert({
            where: { name: c },
            update: {},
            create: { name: c, description: `Categoría de ${c}` }
        });
    }
    // Users
    const passwordHash = await bcrypt_1.default.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@mediolike.com' },
        update: {},
        create: {
            email: 'admin@mediolike.com',
            password: passwordHash,
            roleId: adminRole.id,
            profile: {
                create: { firstName: 'Carlos', lastName: 'Admin', bio: 'Administrador Supremo' }
            }
        }
    });
    const instructorUser = await prisma.user.upsert({
        where: { email: 'profesor@mediolike.com' },
        update: {},
        create: {
            email: 'profesor@mediolike.com',
            password: passwordHash,
            roleId: instructorRole.id,
            profile: {
                create: { firstName: 'María', lastName: 'Instructora', bio: 'Experta en Pedagogía' }
            }
        }
    });
    const studentUser = await prisma.user.upsert({
        where: { email: 'estudiante@mediolike.com' },
        update: {},
        create: {
            email: 'estudiante@mediolike.com',
            password: passwordHash,
            roleId: participantRole.id,
            profile: {
                create: { firstName: 'Juan', lastName: 'Estudiante', bio: 'Aprendiz activo' }
            }
        }
    });
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
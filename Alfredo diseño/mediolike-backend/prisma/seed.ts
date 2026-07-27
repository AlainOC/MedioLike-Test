import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
  const passwordHash = await bcrypt.hash('admin123', 10);
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

  console.log('Seeding courses...');
  const reactCourse = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'React de Cero a Experto',
      description: 'Aprende React con Hooks y Redux.',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800',
      instructorId: instructorUser.id,
      categoryId: 1 // Programación
    }
  });

  const uxCourse = await prisma.course.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Diseño UX/UI Avanzado',
      description: 'Domina Figma y metodologías ágiles de diseño.',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800',
      instructorId: instructorUser.id,
      categoryId: 2 // Diseño UX
    }
  });

  const marketingCourse = await prisma.course.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Marketing Digital 360',
      description: 'Estrategias en Facebook Ads, Google Ads y SEO.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800',
      instructorId: instructorUser.id,
      categoryId: 3 // Marketing
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

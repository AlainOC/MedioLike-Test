# 📋 Proyecto Mediolike - Documentación General

## 🎯 Descripción del Proyecto

**Mediolike** es una plataforma digital integral de capacitación y comunidad educativa diseñada para administrar cursos, membresías, eventos en vivo, certificados y pagos. Esta plataforma permite la comercialización, gestión y seguimiento académico de programas de formación profesional.

### Problema a Resolver
La oferta educativa de Mediolike se distribuye actualmente a través de diferentes canales, lo que dificulta:
- Administración centralizada de participantes
- Gestión integral de cursos y membresías
- Control de pagos y transacciones
- Emisión y validación de certificados
- Seguimiento académico

---

## 🔄 Ciclo de Vida del Desarrollo

### Fases del Proyecto

```
1. DESARROLLO LOCAL
   ↓
2. TESTING EN AMBIENTE DE PRUEBA
   ↓
3. VALIDACIÓN Y CORRECCIONES
   ↓
4. CARGA AL REPOSITORIO PRINCIPAL
   ↓
5. DESPLIEGUE EN PRODUCCIÓN
```

### Función de Testing
El equipo realizará pruebas exhaustivas antes de cargar al repositorio principal:
- ✅ Validar funcionalidades implementadas
- ✅ Identificar y documentar errores
- ✅ Verificar integración entre módulos
- ✅ Confirmar cumplimiento de requerimientos
- ✅ Documentar cambios realizados

**Responsable**: Equipo de QA / Líderes de desarrollo

---

## 👥 Equipo de Desarrollo

| Rol | Nombre | Responsabilidad |
|-----|--------|-----------------|
| **Frontend Lead** | Joaquín | Angular + PrimeNG, interfaces de usuario |
| **Backend Lead** | Pablo | Express, API REST, autenticación |
| **Arquitecto / DevOps** | Alain | Infraestructura, BD, documentación técnica |

---

## 📅 SPRINT 1 – Configuración Base de la Plataforma Mediolike

**Duración**: 2 semanas

### Objetivo del Sprint
Establecer la estructura base del proyecto, incluyendo configuración del frontend (Angular), backend (Express), arquitectura de base de datos y ambiente Docker reproducible.

---

### 📌 Frontend - Responsable: Joaquín

#### FE-001: Configuración Base Angular + PrimeNG
**Status**: Iniciado

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Crear proyecto Angular<br>• Integrar PrimeNG y PrimeIcons<br>• Configurar ESLint y Prettier<br>• Crear environments (dev, test, prod)<br>• Implementar routing y route guards<br>• Configurar interceptors HTTP |
| **Entregable** | Estructura base del frontend funcional y escalable |
| **Criterios de Aceptación** | • Proyecto genera sin errores<br>• ESLint sin warnings<br>• Routing básico funcionando<br>• Guards protegiendo rutas |

#### FE-002: Integración de Template Administrativo
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Seleccionar template PrimeNG administrativo<br>• Integrar layout base de la aplicación<br>• Implementar menú lateral navegable<br>• Crear header con branding<br>• Diseñar footer con enlaces |
| **Entregable** | Dashboard administrativo con layout funcional |
| **Criterios de Aceptación** | • Layout responsive en desktop, tablet y mobile<br>• Menú colapsable/expandible<br>• Navegación entre secciones funcional |

#### FE-003: Pantallas Iniciales
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Crear interfaz de Login<br>• Implementar formulario de recuperación de contraseña<br>• Diseñar Dashboard principal<br>• Crear pantalla de perfil de usuario |
| **Entregable** | Vistas navegables y validadas |
| **Criterios de Aceptación** | • Formularios con validación<br>• Navegación entre pantallas funcional<br>• Diseño coherente con branding |

---

### 📌 Backend - Responsable: Pablo

#### BE-001: Configuración Base Express
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Crear proyecto Express con TypeScript<br>• Configurar ESLint y Prettier<br>• Integrar Swagger para documentación API<br>• Configurar Docker y Docker Compose<br>• Establecer variables de entorno |
| **Entregable** | Proyecto backend inicializado con tooling listo |
| **Criterios de Aceptación** | • Servidor Express ejecutándose en puerto 3000<br>• Documentación Swagger accesible<br>• Docker compose con BD funcionando |

#### BE-002: Implementación de Arquitectura Limpia
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Crear capa **Domain** (entidades, interfaces)<br>• Crear capa **Application** (servicios, casos de uso)<br>• Crear capa **Infrastructure** (repositorios, BD)<br>• Crear capa **Presentation** (controladores, rutas)<br>• Implementar patrón inyección de dependencias |
| **Entregable** | Estructura Clean Architecture escalable |
| **Criterios de Aceptación** | • Capas desacopladas<br>• No hay dependencias circulares<br>• Fácil de testear y mantener |

#### BE-003: Autenticación JWT
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Implementar endpoint Login con JWT<br>• Crear mecanismo Refresh Token<br>• Desarrollar Middleware de autenticación<br>• Implementar sistema de Roles y permisos<br>• Crear guardia de autorización |
| **Entregable** | API de autenticación segura y funcional |
| **Criterios de Aceptación** | • Token JWT generado correctamente<br>• Refresh token extiende sesión<br>• Middleware protege rutas<br>• Roles validan permisos |

---

### 📌 Arquitectura & DevOps - Responsable: Alain

#### ARQ-001: Diseño de Base de Datos Inicial
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Modelar tabla **Users** (id, email, password_hash, estado, timestamps, soft_delete)<br>• Diseñar tabla **Roles** (id, nombre, descripción, timestamps)<br>• Crear tabla **Permissions** (id, nombre, descripción, timestamps)<br>• Modelar tabla **Profiles** (id, usuario, datos perfil, timestamps)<br>• Diseñar tabla **Categories** (slug, subcategorías)<br>• Crear tabla **Settings** (claves globales con value_type)<br>• Establecer relaciones y restricciones |
| **Entregable** | Diagrama ER y diccionario de datos completo |
| **Criterios de Aceptación** | • Diagrama legible y documentado<br>• Todas las relaciones definidas<br>• Diccionario describe cada tabla y campo<br>• Nombrado según estándares SQL |

#### ARQ-002: Infraestructura Docker
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Crear Dockerfile para backend<br>• Crear Dockerfile para frontend<br>• Configurar Docker Compose con servicios (API, BD, Cache)<br>• Establecer variables de entorno (.env)<br>• Implementar volumes para persistencia<br>• Documentar comandos de ejecución |
| **Entregable** | Ambiente de desarrollo reproducible en Docker |
| **Criterios de Aceptación** | • `docker-compose up` inicia todo correctamente<br>• BD accesible desde la API<br>• Frontend accesible en localhost:4200<br>• API accesible en localhost:3000 |

#### ARQ-003: Documentación Técnica
**Status**: Por iniciar

| Aspecto | Descripción |
|--------|------------|
| **Tareas** | • Crear README con descripción del proyecto<br>• Documentar Git Flow (main, develop, feature/**)<br>• Establecer convenciones de código (naming, commits)<br>• Describir arquitectura general del sistema<br>• Crear guía de instalación y ejecución<br>• Documentar estructura de carpetas |
| **Entregable** | Documentación inicial completa del proyecto |
| **Criterios de Aceptación** | • README claro para nuevos desarrolladores<br>• Instrucciones de setup funcionan<br>• Convenciones son específicas y medibles |

---

## 🎓 Contexto Funcional del Proyecto

### Objetivos Estratégicos

✅ **Objetivo General**: Desarrollar una plataforma digital integral que administre cursos, participantes, membresías, pagos, certificaciones y eventos en vivo.

✅ **Objetivos Específicos**:
1. Administrar cursos y programas de capacitación
2. Gestionar participantes y su progreso académico
3. Controlar membresías (mensuales y anuales)
4. Gestionar pagos y transacciones seguras
5. Organizar eventos en vivo con transmisiones
6. Automatizar generación de certificados validados

---

### 👤 Actores del Sistema

| Actor | Descripción |
|-------|------------|
| **Administrador General** | Control total de la plataforma, usuarios, configuración |
| **Coordinador Académico** | Gestiona cursos, instructores, contenido académico |
| **Instructor** | Crea cursos, califica evaluaciones, imparte eventos |
| **Participante** | Se inscribe a cursos, accede contenido, obtiene certificados |
| **Personal Administrativo** | Gestiona facturación, reportes, soporte |

---

### 📦 Módulos Funcionales

| ID | Módulo | Descripción |
|----|--------|------------|
| **MF-01** | Landing Page | Página inicial pública y atractiva |
| **MF-02** | Gestión de Usuarios | Registro, login, perfiles, roles |
| **MF-03** | Gestión de Participantes | Datos académicos y personal de estudiantes |
| **MF-04** | Gestión de Cursos | Creación, edición, administración de programas |
| **MF-05** | Inscripciones | Registro de participantes a cursos |
| **MF-06** | Membresías | Planes mensuales/anuales con acceso a cursos |
| **MF-07** | Pagos | Procesamiento de transacciones |
| **MF-08** | Dashboard del Participante | Panel personalizado con mis cursos y progreso |
| **MF-09** | Eventos en Vivo | Transmisiones y conferencias en vivo |
| **MF-10** | Certificados | Emisión automática con validación QR |
| **MF-11** | Evaluaciones | Exámenes y calificaciones |
| **MF-12** | Comunicación | Notificaciones y mensajería |
| **MF-13** | Reportes y Analítica | Dashboards de datos e indicadores |
| **MF-14** | Administración de Instructores | Gestión de docentes y sus cursos |
| **MF-15** | Gestión de Contenido | Recursos, lecciones, módulos educativos |

---

### 📋 Reglas de Negocio Clave

| RN | Regla |
|----|-------|
| **RN-001** | Todo participante debe estar registrado para acceder al contenido |
| **RN-002** | Un participante puede inscribirse a múltiples cursos |
| **RN-003** | Un curso puede tener múltiples participantes |
| **RN-004** | Un instructor puede impartir múltiples cursos |
| **RN-005** | Todo curso debe pertenecer a una categoría |
| **RN-006** | Los cursos pueden ser gratuitos o de pago |
| **RN-007** | Las membresías pueden ser mensuales o anuales |
| **RN-008** | Una membresía activa otorga acceso a varios cursos |
| **RN-009** | Los certificados sólo se emiten al cumplir requisitos del curso |
| **RN-010** | Cada certificado tiene un folio único |
| **RN-011** | Los certificados incluyen validación mediante código QR |
| **RN-012** | Todo evento en vivo tiene fecha y hora programada |
| **RN-013** | Un participante puede registrarse a múltiples eventos |
| **RN-014** | Las inscripciones pueden cancelarse antes del inicio |
| **RN-015** | Todo pago genera una evidencia de transacción |
| **RN-016** | Los participantes pueden descargar sus certificados cuando están disponibles |
| **RN-017** | Los cursos se organizan en módulos y lecciones |
| **RN-018** | El progreso académico se almacena por participante y curso |
| **RN-019** | Las evaluaciones pueden ser obligatorias para certificar |
| **RN-020** | Una membresía vencida pierde acceso al contenido restringido |

---

## 🏗️ Stack Tecnológico

### Frontend
- **Framework**: Angular 18+
- **UI Components**: PrimeNG
- **Icons**: PrimeIcons
- **Estilos**: Tailwind CSS / Bootstrap
- **Linting**: ESLint + Prettier
- **Gestión de Estado**: NgRx (futuro)

### Backend
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Arquitectura**: Clean Architecture
- **Autenticación**: JWT + Refresh Token
- **Documentación**: Swagger/OpenAPI
- **Base de Datos**: PostgreSQL / MySQL
- **ORM**: Prisma / TypeORM
- **Linting**: ESLint + Prettier

### DevOps & Infraestructura
- **Containerización**: Docker + Docker Compose
- **CI/CD**: GitHub Actions (futuro)
- **Documentación**: Markdown
- **Control de Versiones**: Git (Git Flow)

---

## 🚀 Resultado Esperado del Sprint 1

### ✅ Frontend
- Angular y PrimeNG configurados y funcionando
- Dashboard administrativo base responsive
- Autenticación conectada al backend
- Routing y guards protegiendo rutas
- ESLint sin warnings

### ✅ Backend
- API Express ejecutándose con TypeScript
- Clean Architecture implementada
- Autenticación JWT funcional
- Swagger documentando endpoints
- Docker configurado

### ✅ Arquitectura & DevOps
- Modelo ER inicial documentado
- Docker Compose ejecutando todos los servicios
- Documentación técnica completa
- Git Flow establecido
- Variables de entorno configuradas

---

## 📝 Próximos Pasos (Sprint 2 en adelante)

1. **Desarrollo de módulos funcionales** (Usuarios, Cursos, Inscripciones)
2. **Integración de pasarela de pagos** (Stripe/PayPal)
3. **Sistema de notificaciones** (Email, SMS)
4. **Generación de certificados con QR**
5. **Eventos en vivo y streaming**
6. **Dashboard de reportes y analítica**
7. **Aplicación móvil** (Futuro)

---

## 📞 Contacto y Soporte

Para consultas sobre el proyecto, comunicarse con los líderes de equipo:
- **Frontend**: Joaquín
- **Backend**: Pablo
- **Arquitectura**: Alain

---

**Última actualización**: Junio 2026
**Versión**: 1.0

# 📋 Proyecto MedioLike

**MedioLike** es una plataforma digital integral de capacitación y comunidad educativa diseñada para administrar cursos, membresías, eventos en vivo, certificados y pagos.

## 🚀 Arquitectura

El proyecto está separado en los siguientes componentes principales:
- **Frontend / Cliente**: Angular 18+ y PrimeNG (Ver carpeta `frontend/`).
- **Backend / API**: Express.js y TypeScript usando Clean Architecture (Ver carpeta `backend/`).
- **Base de Datos**: PostgreSQL proporcionado a través de Docker.

## 📁 Estructura del Repositorio

- `/frontend`: Código fuente de la aplicación Angular.
- `/backend`: Código fuente de la API REST (Express).
- `/docs`: Documentación técnica, diseño de base de datos y políticas.
- `docker-compose.yml`: Archivo base para orquestación de servicios (BD, dependencias).

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) (Versión recomendada LTS)
- [Docker](https://www.docker.com/) y Docker Compose
- Gestor de paquetes npm o yarn.

## 📚 Documentación Adicional

- [Políticas de Ramas (Git Flow)](docs/GIT_FLOW.md)
- [Esquema de Base de Datos y Diccionario (Mermaid)](docs/DATABASE_SCHEMA.md)

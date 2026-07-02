# 🌿 Políticas de GIT Flow y Convenciones

Para mantener un repositorio organizado y seguro, seguiremos las siguientes políticas de trabajo colaborativo.

## 📊 Ramas Principales

- `main`: Rama de producción. Solo recibe código funcional, probado y estable. Nunca se trabaja directamente aquí.
- `develop`: Rama de integración. Aquí se unen todas las características nuevas antes de pasar a `main`. 

## 🌱 Ramas de Trabajo (Feature Branches)

Toda nueva característica, corrección o mejora debe realizarse en su propia rama generada a partir de `develop`.

Nomenclatura:
- `feature/nombre-de-la-tarea`: Para funcionalidades nuevas (Ej. `feature/login-jwt`).
- `bugfix/nombre-del-bug`: Para corrección de errores (Ej. `bugfix/fix-login-error`).
- `docs/nombre-del-documento`: Para documentación únicamente (Ej. `docs/estructura-bd`).

## ✍️ Convenciones de Commits

Los mensajes de commit deben seguir el estándar de [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Una nueva característica.
- `fix:` Corrección de un error.
- `docs:` Cambios solo de documentación.
- `chore:` Cambios en proceso de build, herramientas auxiliares, librerías, etc.

Ejemplo: `feat: implementación de inicio de sesión con JWT`

## 🔄 Flujo de Trabajo (Workflow)

1. Crear rama a partir de `develop`: `git checkout -b feature/mi-nueva-fichura develop`
2. Trabajar localmente y hacer commits ordenados.
3. Subir rama al repositorio remoto.
4. Crear Pull Request hacia `develop`.
5. Revisión y aprobación (Merge).

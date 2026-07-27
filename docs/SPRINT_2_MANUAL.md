# Manual de Administración MedioLike - Sprint 2

Este documento detalla todas las actualizaciones estéticas, funcionales y de arquitectura frontend implementadas durante el Sprint 2 para el **Panel de Administración de MedioLike**. El objetivo de este sprint ha sido renovar por completo la experiencia de usuario (UX) y la interfaz (UI) para crear una plataforma inmersiva, moderna y de alta gama.

---

## 1. Módulo de Autenticación (Login)

La puerta de entrada a la plataforma ha sido rediseñada desde cero para transmitir innovación tecnológica.

### Características implementadas:
- **Partículas Interactivas (Canvas)**: Un fondo dinámico estilo "Cyber Dark" espacial donde las partículas reaccionan y siguen el movimiento del puntero del usuario.
- **Formulario Glassmorphism**: El formulario flota sobre el espacio con un diseño de cristal oscuro semi-transparente y bordes iridiscentes.
- **Efecto Ripple (Burbuja)**: Al hacer clic en el botón "Ingresar al Panel", se despliega una onda expansiva desde el centro hacia afuera.
- **Usuarios de Prueba (Simulador)**:
  Para facilitar las pruebas de restricción de rutas que se elaborarán próximamente, se han habilitado las siguientes credenciales de acceso:
  - **Administrador**: `admin@admin.com` | Pass: `admin`
  - **Maestro**: `maestro@maestro.com` | Pass: `maestro`
  - **Estudiante**: `estudiante@estudiante.com` | Pass: `estudiante`

> **[ ESPACIO PARA CAPTURA DE PANTALLA: Pantalla de Login interactiva con el cursor moviendo las partículas ]**
> ![Captura Login]()

---

## 2. Ecosistema "Dark Neon" y Navegación "Liquid Glass"

Una vez autenticado, el usuario abandona el login y entra al Panel Central, el cual goza de una arquitectura estética totalmente nueva.

### Pantallas de Transición (Splash Screens)
- **Bienvenida**: Al ingresar correctamente, una pantalla oscura cubre el sistema. Aparece el logotipo de MedioLike brillando, saludando con un "¡Bienvenido Admin!" durante 3 segundos antes de desvanecerse hacia las tablas.
- **Cierre Seguro**: Al salir, se pinta un overlay que oscurece el panel y muestra tonos rojizos/naranjas con el mensaje "Cerrando sesión de manera segura..." antes de botar al usuario.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: Pantalla de Bienvenida mostrando el logo animado ]**
> ![Captura Splash Bienvenida]()

### Navegación Líquida (Pill Navigation)
- En lugar de texto estático, el menú ("Usuarios", "Roles", "Ajustes") reside en una cápsula flotante estilo aplicación móvil.
- **Fluido Iridiscente**: La opción actualmente seleccionada se encapsula en una "burbuja" interna oscura que posee un borde con colores holográficos en constante rotación. Animación liquida aplicada a los textos: cuando haces clic, el texto se "desenfoca/distorsiona" imitando una onda en el agua.
- **Arrastre en vivo (Press & Drag)**: Es posible navegar entre paneles sin soltar el clic; con tan solo arrastrar el puntero de una opción a otra, la burbuja iridiscente te sigue dinámicamente.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: Menú superior mostrando la burbuja líquida arcoíris en "Usuarios" ]**
> ![Captura Navegación Líquida]()

---

## 3. Guía de Módulos (Gestión de Panel)

El entorno en el que residen las tablas es el nuevo **Premium Neon Theme**: un fondo negro/azulado ultra profundo con gigantescas esferas de luz sutil (Cyan y Naranja) que rotan lentamente por 30 segundos. Sobre este fondo, las cartas (`cards`) de tablas lucen como cristales gruesos brillantes.

### A. Módulo de Usuarios
**¿Para qué sirve?** 
Este apartado es el corazón administrativo. Te permite visualizar a todas las personas registradas en la academia o plataforma MedioLike.
**Ejemplo de uso en MedioLike**: 
Si un nuevo estudiante compra un curso o se inscribe a un nivel, aquí aparecerán sus datos. Puedes dar de baja (desactivar) la cuenta de un usuario por falta de pago o actualizar su correo en caso de que lo pierda.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: Fila de tabla de Usuarios siendo "hovered" con el efecto resplandeciente cyan ]**
> ![Captura Módulo Usuarios]()

### B. Módulo de Roles
**¿Para qué sirve?** 
Define qué puede y qué no puede hacer un usuario dentro del sistema, asignándole un permiso específico.
**Ejemplo de uso en MedioLike**: 
Imagina que contratas a alguien para ayudarte a gestionar dudas. En lugar de darle tu cuenta de *Admin*, creas desde este apartado un rol llamado `Monitor` (con permisos solo de lectura) y luego se lo asignas en la pestaña de Usuarios. Así también se controla la división entre funcionalidad que ve el `Estudiante` y el `Maestro` para las clases de medio.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: Tabla del módulo Roles ]**
> ![Captura Módulo Roles]()

### C. Módulo de Ajustes (Configuraciones)
**¿Para qué sirve?** 
Son los interruptores maestros o metadatos técnicos que controlan cómo se comporta globalmente el portal de MedioLike. 
**Ejemplo de uso en MedioLike**: 
Aquí podrías tener un ajuste que diga `MODO_MANTENIMIENTO` con valor "Activo". Si lo activas, cuando un `Estudiante` intente usar la plataforma, verá un mensaje de "Volvemos pronto". También sirve para configurar la cantidad de minutos de sesión inactiva que se permite antes de cerrar la sesión automáticamente.

> **[ ESPACIO PARA CAPTURA DE PANTALLA: Tabla del módulo Ajustes ]**
> ![Captura Módulo Ajustes]()

---
*Fin de la documentación - Panel Administrativo MedioLike Sprint 2*

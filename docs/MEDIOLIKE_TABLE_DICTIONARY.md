# Diccionario Funcional: Módulo de Seguridad y Administración

A continuación, se define conceptual y lógicamente para qué sirve cada tabla y subsistema creado en el Módulo Core de Administración. Este contenido está redactado formalmente para ser anexado a manuales técnicos y documentaciones institucionales de MedioLike.

### 1. Tabla de Usuarios (`users`)
- **¿Para qué sirve?** Es el registro universal de identidades del sistema. Abarca a cualquier persona física que interactúe administrativamente con MedioLike (Administradores, Instructores, Coordinadores, etc.). 
- **¿Cómo se usa?** Cuando RH da de alta a un empleado, este se inserta en esta tabla. Guarda credenciales esenciales de acceso como su Correo Electrónico (para login), su Contraseña en formato de Hash Encriptado (para seguridad máxima B-Crypt), y su Estado (`ACTIVE`, `SUSPENDED`). El software bloquea instantáneamente a aquellos que tengan estatus suspendido.

### 2. Tabla de Roles (`roles`) y Permisos
- **¿Para qué sirve?** Sirve para agrupar privilegios lógicos. En un sistema de educación, asignar accesos individuales (ej. "Puede crear curso", "Puede borrar alumno") es infactible y produce caos. Los Roles empaquetan permisos.
- **¿Cómo se usa?** Un Súper Administrador crea el rol genérico: *"Coordinador Académico"*. Posteriormente, al nuevo empleado se le asigna ese rol pre-envasado, logrando que herede instantáneamente 50 reglas lógicas de negocio, delimitando exactamente a qué módulos de PrimeNG podrá acceder y a cuáles no, garantizando jerarquía.

### 3. Tabla de Configuraciones (`settings`)
- **¿Para qué sirve?** Actúa como las "Variables de Entorno Globales" manipulables sin necesidad de programación ni redespliegues del servidor.
- **¿Cómo se usa?** Consiste en pares dinámicos de *Llave-Valor*. Si el director general decide alterar la "Comisión de Procesamiento de Pago", un administrador entra a este listado y cambia la llave `DEFAULT_PAYMENT_FEE` de "0.5" a "0.8". Al guardarlo, todo el código BackEnd de la empresa automáticamente respetará esa nueva regla de cálculos, proveyendo agilidad extrema sin afectar servidores activos.
si 
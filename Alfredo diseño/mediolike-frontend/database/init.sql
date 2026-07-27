-- Roles Table
CREATE TABLE IF NOT EXISTS Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Permissions Table
CREATE TABLE IF NOT EXISTS Permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES Roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profiles Table
CREATE TABLE IF NOT EXISTS Profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES Users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    phone VARCHAR(20)
);

-- Categories Table (for Courses)
CREATE TABLE IF NOT EXISTS Categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table (for System configurations)
CREATE TABLE IF NOT EXISTS Settings (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    key_value TEXT NOT NULL,
    description TEXT
);

-- Insert Roles
INSERT INTO Roles (name, description) VALUES
('Admin', 'Administrador General de la plataforma'),
('Coordinator', 'Coordinador Académico'),
('Instructor', 'Instructor de Cursos'),
('Participant', 'Estudiante/Participante')
ON CONFLICT (name) DO NOTHING;

-- Insert Mock Users
INSERT INTO Users (email, password_hash, role_id) VALUES
('admin@mediolike.com', '$2b$10$xyz...', 1), -- Dummy hash
('instructor@mediolike.com', '$2b$10$xyz...', 3),
('estudiante@mediolike.com', '$2b$10$xyz...', 4)
ON CONFLICT (email) DO NOTHING;

-- Insert Mock Profiles
INSERT INTO Profiles (user_id, first_name, last_name, second_last_name) VALUES
(1, 'Admin', 'General', 'Mediolike'),
(2, 'Juan', 'Pérez', 'García'),
(3, 'María', 'López', 'Martínez')
ON CONFLICT (user_id) DO NOTHING;

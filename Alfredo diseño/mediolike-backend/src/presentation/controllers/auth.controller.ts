import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_12345';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
        profile: true
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { 
        userId: user.id, 
        role: user.role.name 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role_name: user.role.name,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, roleName } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Default role to Participant if not provided
    const targetRoleName = roleName || 'Participant';
    const role = await prisma.role.findUnique({ where: { name: targetRoleName } });

    if (!role) {
      return res.status(400).json({ message: 'El rol especificado no existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId: role.id,
        profile: {
          create: {
            firstName,
            lastName
          }
        }
      },
      include: {
        role: true,
        profile: true
      }
    });

    const token = jwt.sign(
      { 
        userId: newUser.id, 
        role: newUser.role.name 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role_name: newUser.role.name,
        profile: newUser.profile
      }
    });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      // Devolvemos 200 de todas formas por seguridad (para no revelar qué correos existen)
      return res.status(200).json({ message: 'Si el correo existe, se enviará un enlace de recuperación' });
    }

    const resetToken = jwt.sign(
      { userId: user.id }, 
      JWT_SECRET, 
      { expiresIn: '15m' }
    );

    // TODO: En un entorno real, enviar este token por correo electrónico (SendGrid, Nodemailer)
    console.log(`\n======================================================`);
    console.log(`[SIMULACIÓN ENVÍO DE CORREO]`);
    console.log(`Para recuperar tu contraseña, haz clic en el siguiente enlace:`);
    console.log(`http://localhost:4200/forgot-password?token=${resetToken}`);
    console.log(`======================================================\n`);

    res.status(200).json({ message: 'Si el correo existe, se enviará un enlace de recuperación' });
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error en resetPassword:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

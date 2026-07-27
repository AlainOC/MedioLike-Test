import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ error: 'No autorizado' });

    const { plan, amount } = req.body;

    if (!plan || !amount) {
      return res.status(400).json({ error: 'Plan y monto requeridos' });
    }

    // 1. Simular validación del banco / tarjeta
    console.log(`[PASARELA DE PAGO MOCK] Procesando cobro de $${amount} MXN para el plan ${plan}...`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    console.log(`[PASARELA DE PAGO MOCK] Cobro exitoso. Generando transacción...`);

    // 2. Registrar en base de datos como Settings/Payment (aquí usamos un "upsert" en Setting para registrar que es Pro)
    // Ya que no tenemos tabla específica de Payments, utilizaremos el campo 'profile' o 'settings' para marcar la membresía.
    
    // Actualizamos al usuario y creamos/actualizamos un Setting
    await prisma.setting.upsert({
      where: { userId: Number(userId) },
      update: {
        theme: `Plan: ${plan} - Activo`,
        notifications: true
      },
      create: {
        userId: Number(userId),
        theme: `Plan: ${plan} - Activo`,
        language: 'es',
        notifications: true
      }
    });

    res.status(200).json({ 
      success: true, 
      message: 'Membresía adquirida con éxito. ¡Bienvenido a Premium!',
      transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });

  } catch (error) {
    console.error('Error en checkout:', error);
    res.status(500).json({ error: 'Error interno al procesar el pago' });
  }
};

import { Router } from 'express';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    
    // Crear la URL pública para acceder al archivo
    const isVideo = req.file.mimetype.startsWith('video/');
    const folder = isVideo ? 'videos' : 'images';
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${folder}/${req.file.filename}`;
    
    res.status(200).json({
      message: 'Archivo subido con éxito',
      url: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno al subir el archivo' });
  }
});

export default router;

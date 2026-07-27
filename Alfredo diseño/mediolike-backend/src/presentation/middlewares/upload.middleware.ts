import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determinar la carpeta según el tipo de archivo
    if (file.mimetype.startsWith('video/')) {
      cb(null, path.join(__dirname, '../../../uploads/videos'));
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, path.join(__dirname, '../../../uploads/images'));
    } else {
      cb(null, path.join(__dirname, '../../../uploads/images'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filtro para aceptar solo imágenes y videos
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no soportado. Solo imágenes y videos.'), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024 // Límite de 500MB para videos
  }
});

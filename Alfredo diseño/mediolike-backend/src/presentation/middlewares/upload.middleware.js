"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de almacenamiento
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Determinar la carpeta según el tipo de archivo
        if (file.mimetype.startsWith('video/')) {
            cb(null, path_1.default.join(__dirname, '../../../uploads/videos'));
        }
        else if (file.mimetype.startsWith('image/')) {
            cb(null, path_1.default.join(__dirname, '../../../uploads/images'));
        }
        else {
            cb(null, path_1.default.join(__dirname, '../../../uploads/images'));
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
// Filtro para aceptar solo imágenes y videos
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Formato de archivo no soportado. Solo imágenes y videos.'), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 500 * 1024 * 1024 // Límite de 500MB para videos
    }
});
//# sourceMappingURL=upload.middleware.js.map
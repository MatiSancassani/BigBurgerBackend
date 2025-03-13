import multer from 'multer';
import config from '../config.js';

// Configuración para productos
const addProductFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadProductos = multer({
    storage: addProductFile,
    limits: { fileSize: 20 * 1024 * 1024 }
});

// Configuración para adicionales
const addAdditionalFile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_DIR_ADDITIONALS); // Puedes usar una carpeta diferente para adicionales
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const uploadAdicionales = multer({ storage: addAdditionalFile });




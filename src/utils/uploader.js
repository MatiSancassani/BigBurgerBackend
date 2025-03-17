import path from 'path'
import multer from 'multer'
import fs from 'fs';
import config from '../config.js';

const getDynamicStorage = (subFolder) => {
    const uploadPath = path.join(config.UPLOAD_DIR, subFolder);

    // Crear la carpeta si no existe
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    });
};

// Función para crear un uploader dinámico basado en la subcarpeta
export const uploader = (subFolder) => {
    const storage = getDynamicStorage(subFolder);
    return multer({ storage, limits: { fileSize: 10000000 } }); // Asegurarse de retornar la instancia multer
};



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




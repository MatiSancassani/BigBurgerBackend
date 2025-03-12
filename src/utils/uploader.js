import multer from 'multer'
import config from '../config.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_DIR); // Usar la ruta desde config
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generar un nombre único
    }
});

export const upload = multer({ storage });



const storageAdditional = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.UPLOAD_ADDITIONALS_DIR); // Usar la ruta desde config
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generar un nombre único
    }
});

export const uploadAdditional = multer({ storageAdditional });




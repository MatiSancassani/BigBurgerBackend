import path from 'path'
import multer from 'multer'
import fs from 'fs';
import config from '../config.js';
import { Storage } from '@google-cloud/storage';

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


const storage = new Storage({
    keyFilename: path.join(config.DIRNAME, './config/keys.json'),
});

const bucketName = 'bucket_img_backend';
export const bucket = storage.bucket(bucketName);

const uploaderCloud = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10000000 }
})

const uploadToGCS = async (file) => {
    return new Promise((resolve, reject) => {
        if (!file) return reject('No hay archivos');

        const blob = bucket.file(`products/${Date.now()}_${file.originalname}`);
        const blobStream = blob.createWriteStream({
            resumable: false,
            public: true,
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (err) => reject(err));

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    })
}

export { uploadToGCS, uploaderCloud }



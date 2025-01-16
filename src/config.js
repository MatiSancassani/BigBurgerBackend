import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 8080,
    SERVER: 'Servidor 2025',
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),

    get UPLOAD_DIR() { return path.join(this.DIRNAME, 'public', 'uploads'); },
    MONGODB_URI: ('mongodb+srv://matisancassani:sanca123@cluster0.lcblgku.mongodb.net/BigBurgerDB'),

}

export default config;
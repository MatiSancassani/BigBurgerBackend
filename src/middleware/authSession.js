import jwt from 'jsonwebtoken';
import config from '../config.js';

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token; // Leer desde cookie firmada si usas cookieParser('secret')

    let data = null;
    req.session = { user: null }
    if (!token) return next(); // No hay token, continuar sin user

    try {
        const data = jwt.verify(token, config.JWT_SECRET_KEY);
        req.session.user = data; // Guardamos el payload del token en la request
    } catch (err) {
        res.clearCookie("token");
    }

    next();
};

export default authMiddleware;
import express from "express";
import http from 'http';
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config.js";
import { uploader } from "./utils/uploader.js";

import AdditionalRouter from './routes/additionals.routes.js'
import ProductsRouter from "./routes/products.routes.js";
import AuthRouter from "./routes/auth.routes.js";
import cartsRoutes from './routes/carts.routes.js'
import passport from './config/passport.strategies.js'
import authMiddleware from "./middleware/authSession.js";

const app = express();

const httpServer = http.createServer(app);

const corsOptions = {
    origin: true, // Permite cualquier origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

const PORT = config.PORT || 8020;


app.post('/upload', uploader('thumbnail').single('thumbnail'), (req, res) => {
    console.log(req.file);
    res.sendStatus(200);

})
httpServer.listen(PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(authMiddleware);
    app.use(passport.initialize());

    // app.use("/static", express.static(`${config.DIRNAME}/public`));
    app.use("/public", express.static(`${config.UPLOAD_DIR}`));
    app.use("/api/carts", cartsRoutes);
    app.use("/api/products", ProductsRouter);
    app.use("/api/additionals", AdditionalRouter);
    app.use('/api', AuthRouter);
    console.log(`Servidor activo en http://localhost:${PORT}`);
})
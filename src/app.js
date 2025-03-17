import express from "express";
import http from 'http';
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config.js";

import AdditionalRouter from './routes/additionals.routes.js'
import ProductsRouter from "./routes/products.routes.js";
import AuthRouter from "./routes/auth.routes.js";
import cartsRoutes from './routes/carts.routes.js'

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

httpServer.listen(PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);
    app.use(express.json({ limit: '20mb' }));
    app.use(express.urlencoded({ limit: '20mb', extended: true }));
    app.use(cookieParser());

    app.use("/static", express.static(`${config.DIRNAME}/public`));
    app.use("/uploads", express.static(`${config.DIRNAME}/uploads`));

    app.use("/api/carts", cartsRoutes);
    app.use("/api/products", ProductsRouter);
    app.use("/api/additionals", AdditionalRouter);
    app.use('/api', AuthRouter);

    console.log(config.DIRNAME)
    console.log(`Servidor activo en http://localhost:${PORT}`);
})
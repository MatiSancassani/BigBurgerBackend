import express from "express";
import http from 'http';
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import config from "./config.js";

import ProductsRouter from "./routes/products.routes.js";

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
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/public', express.static(path.join(config.DIRNAME, 'public')));

    app.use("/api/products", ProductsRouter);

    console.log(config.DIRNAME)
    console.log(`Servidor activo en http://localhost:${PORT}`);
})
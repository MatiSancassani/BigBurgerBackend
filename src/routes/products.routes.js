import { Router } from "express";
import { getProduct, addProduct, getProductById } from "../controllers/products.controller.js";
import { uploader } from "../utils/uploader.js";

const router = Router();

router.get("/", getProduct);
router.get("/:pid", getProductById);
router.post("/", uploader('products').single('productsImages'), addProduct);

export default router;
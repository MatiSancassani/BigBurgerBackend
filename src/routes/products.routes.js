import { Router } from "express";
import { getProduct, addProduct, getProductById } from "../controllers/products.controller.js";
import { uploadProductos } from "../utils/uploader.js";

const router = Router();

router.get("/", getProduct);
router.get("/:pid", getProductById);
router.post("/", uploadProductos.single('thumbnail'), addProduct);

export default router;
import { Router } from "express";
import { getProduct, addProduct, getProductById } from "../controllers/products.controller.js";
import { uploaderCloud } from "../utils/uploader.js";

const router = Router();

router.get("/", getProduct);
router.get("/:pid", getProductById);
router.post("/", uploaderCloud.single('thumbnail'), addProduct);

export default router;
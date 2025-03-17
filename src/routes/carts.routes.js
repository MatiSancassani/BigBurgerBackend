import { Router } from "express";
import {
    getCartById,
    addCart,
    getCartIdService,
    addProductInCart
} from "../controllers/carts.controller.js";


const router = Router();

router.get("/", getCartIdService);
router.get("/:cid", getCartById);
router.post("/", addCart);
router.post("/:cid/product/:pid", addProductInCart);
// router.put("/:cid/products/:pid", updateProductInCart);
// router.delete("/:cid/products/:pid", deleteProductInCart);
// router.delete("/:cid", deleteAllProducts);

export default router;
import { Router } from "express";
import {
    getCartById,
    addCart,
    getCartIdService,
    addProductInCart,
    updateProductInCart,
    deleteProductInCart,
    deleteAllProducts
} from "../controllers/carts.controller.js";


const router = Router();

router.get("/", getCartIdService);
router.get("/:cid", getCartById);
router.post("/", addCart);
router.post("/:cid/product/:pid", addProductInCart);
router.put("/:cid/product/:pid", updateProductInCart);
router.delete("/:cid/product/:productInCartId", deleteProductInCart);
router.delete("/:cid", deleteAllProducts);

export default router;
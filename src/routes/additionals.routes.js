import { Router } from "express";
import { getAdditional, addAdditional, getAdditionalById } from "../controllers/additionals.controller.js";
import { uploadAdditional } from "../utils/uploader.js";

const router = Router();

router.get("/", getAdditional)
router.get("/:pid", getAdditionalById)
router.post("/", uploadAdditional.single('thumbnail'), addAdditional);


export default router;
import { Router } from "express";
import { getAdditional, addAdditional, getAdditionalById } from "../controllers/additionals.controller.js";
import { uploadAdicionales } from "../utils/uploader.js";

const router = Router();

router.get("/", getAdditional)
router.get("/:pid", getAdditionalById)
router.post("/", uploadAdicionales.single('thumbnail'), addAdditional);


export default router;
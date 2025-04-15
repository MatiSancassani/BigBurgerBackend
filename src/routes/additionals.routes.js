import { Router } from "express";
import { getAdditional, addAdditional, getAdditionalById } from "../controllers/additionals.controller.js";
import { uploaderCloud } from "../utils/uploader.js";

const router = Router();

router.get("/", getAdditional)
router.get("/:pid", getAdditionalById)
router.post("/", uploaderCloud.single('thumbnail'), addAdditional);


export default router;
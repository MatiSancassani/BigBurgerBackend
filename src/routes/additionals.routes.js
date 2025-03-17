import { Router } from "express";
import { getAdditional, addAdditional, getAdditionalById } from "../controllers/additionals.controller.js";
import { uploader } from "../utils/uploader.js";

const router = Router();

router.get("/", getAdditional)
router.get("/:pid", getAdditionalById)
router.post("/", uploader('additionals').single('additionalsImages'), addAdditional);


export default router;
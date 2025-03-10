import { Router } from "express";
import { createUser, getUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user/:id', getUser);

export default router;
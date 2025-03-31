import { Router } from "express";
import { createUser, getUser, loginUser } from "../controllers/auth.controller.js";
import passport from "../config/passport.strategies.js";

const router = Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user/:id', getUser);

router.get("/google", passport.authenticate("google", { session: false, scope: ["profile", "email"] }));
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => {
        try {
            const user = req.user;
            res.redirect(`https://big-burger-omega.vercel.app`);
        } catch (error) {
            console.error("Error en /google/callback:", error);
            res.status(500).send("Error en el servidor");
        }
    }
);

export default router;
import { Router } from "express";
import { createUser, getSession, getUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import passport from "../config/passport.strategies.js";
const router = Router();


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user/:id', getUser);
router.post('/logout', logoutUser);
router.get("/session", getSession);

router.get("/google", passport.authenticate("google", { session: false, scope: ["profile", "email"] }));
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req, res) => {
        try {
            const user = req.user;
            const { token } = user;

            res
                .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
                .redirect(`https://big-burger-front.vercel.app//`);
        } catch (error) {
            console.error("Error en /google/callback:", error);
            res.status(500).send("Error en el servidor");
        }
    }
);

router.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['public_profile', 'email'] }));
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        try {
            const user = req.user;
            const { token } = user;

            res
                .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
                .redirect(`https://big-burger-front.vercel.app//`);
        } catch (error) {
            console.error("Error en /facebook/callback:", error);
            res.status(500).send("Error en el servidor");
        }
    }
);

export default router;
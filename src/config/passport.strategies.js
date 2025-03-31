import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import dotenv from 'dotenv';
import { getUserByEmailService, registerUserService } from "../services/auth.services.js";
import { createCartService } from "../services/carts.services.js";

dotenv.config();

passport.use('google', new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {

            if (!profile.emails || profile.emails.length === 0) {
                return done(new Error("Google no proporcionó un email"), false);
            }

            const email = profile.emails[0].value;
            let user = await getUserByEmailService(email);

            if (!user) {
                const cart = await createCartService();

                const newUser = {
                    userName: profile.displayName || profile.username,
                    email,
                    password: undefined, // No se almacena contraseña
                    isOAuth: true, // Indicar que se registró con Google
                    cart_id: cart._id, // Crea un carrito asociado al usuario
                };

                user = await registerUserService(newUser);
            }
            // const { _id, name, lastName, rol, cart_id } = user;
            // const token = generateToken({ _id, name, lastName, email, rol, cart_id });

            return done(null, user);

        } catch (error) {
            done(error, false)
        }
    }));

export default passport;
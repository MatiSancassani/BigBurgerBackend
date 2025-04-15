import GoogleStrategy from "passport-google-oauth20";
import FacebookStrategy from "passport-facebook";
import passport from "passport";
import dotenv from 'dotenv';
import { getUserByEmailService, registerUserService } from "../services/auth.services.js";
import { createCartService } from "../services/carts.services.js";
import { generateToken } from "../utils/jsonWebToken.js";

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
                console.log('Creando nuevo usuario con Google')
                const cart = await createCartService();
                const newUser = {
                    userName: profile.displayName || profile.username,
                    email,
                    password: undefined, // No se almacena contraseña
                    isOAuth: true, // Indicar que se registró con Google
                    cart_id: cart._id, // Crea un carrito asociado al usuario
                };

                user = await registerUserService(newUser);
            } else {
                console.log('Usuario ya existe')
            }
            const { _id, userName, lastName, rol, cart_id } = user;
            const token = generateToken({ _id, userName, lastName, email, rol, cart_id });

            return done(null, { token, user });

        } catch (error) {
            done(error, false)
        }
    }));


passport.use('facebook', new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name', 'displayName'] // 👈 Esto es CLAVE
    },
    async (accessToken, refreshToken, profile, done) => {
        try {

            if (!profile.emails || profile.emails.length === 0) {
                return done(new Error("Facebook no proporcionó un email"), false);
            }

            const email = profile.emails[0].value;
            let user = await getUserByEmailService(email);

            if (!user) {
                console.log('Creando nuevo usuario con Facebook')
                const cart = await createCartService();
                const newUser = {
                    userName: profile.displayName || profile.username,
                    email,
                    password: undefined, // No se almacena contraseña
                    isOAuth: true, // Indicar que se registró con Google
                    cart_id: cart._id, // Crea un carrito asociado al usuario
                };

                user = await registerUserService(newUser);
            } else {
                console.log('Usuario ya existe')
            }
            const { _id, userName, lastName, rol, cart_id } = user;
            const token = generateToken({ _id, userName, lastName, email, rol, cart_id });

            return done(null, { token, user });

        } catch (error) {
            done(error, false)
        }
    }));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});



export default passport;
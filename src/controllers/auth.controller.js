import { registerUserService, getUserByEmailService, getUserByIdService } from "../services/auth.services.js";
import bcrypt from "bcrypt";
import { createCartService } from "../services/carts.services.js";
import { generateToken } from "../utils/jsonWebToken.js";
import jwt from "jsonwebtoken";
import config from "../config.js";

export const createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            throw new Error("Los campos son obligatorios");
        }

        if (typeof password !== "string") {
            return res.status(400).send({
                status: "error",
                error: "La contraseña debe ser un texto válido."
            });
        }
        if (password.length < 8 || password.length > 12 ||
            !/[A-Z]/.test(password) ||  // Al menos una mayúscula
            !/[a-z]/.test(password) ||  // Al menos una minúscula
            !/[0-9]/.test(password)) {  // Al menos un número
            return res.status(400).send({
                status: "error",
                error: "La contraseña debe tener entre 8 y 12 caracteres, al menos una mayúscula, una minúscula y un número."
            });
        }
        req.body.password = await bcrypt.hash(password, 10);

        const existEmail = await getUserByEmailService(email);
        if (existEmail) return res.status(400).send({ status: "error", error: "El email ingresado ya existe" });

        const cart = await createCartService();
        req.body.cart_id = cart._id;

        const user = await registerUserService(req.body);

        res.status(200).send({ success: true, data: user });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
            error: error.message,
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmailService(email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email incorrecto",
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Contraseña incorrecta",
            });
        }

        const { _id, userName, rol, cart_id } = user;
        const token = generateToken({ _id, userName, email, rol, cart_id });



        res
            .cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" })
            .status(200).json({
                success: true,
                message: "Inicio de sesión exitoso",
                data: {
                    _id: user._id,
                    userName: user.userName,
                    email: user.email,
                    rol: user.rol,
                    cart_id: user.cart_id || null
                },
            });

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            success: false,
            message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
            error: error.message,
        });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Cierre de sesión exitoso",
        });
    } catch (error) {
        console.error("Error en logout:", error);
        res.status(500).json({
            success: false,
            message: "Error en el servidor. Por favor, inténtelo de nuevo más tarde.",
            error: error.message,
        });
    }
}

export const getSession = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No autenticado" });

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        res.json({ success: true, message: "Sesion activa", data: decoded });
    } catch (error) {
        res.status(401).json({ success: false, message: "No autorizado" });
    }
}
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await getUserByIdService(id)

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).send({ success: true, data: userWithoutPassword });
    } catch (error) {
        res.status(500).send({ success: false, data: null, error: error.message });
    }
}
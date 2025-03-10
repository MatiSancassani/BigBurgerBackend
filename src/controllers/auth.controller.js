import { registerUserService, getEmailService, loginUserService, getUserByIdService } from "../services/auth.services.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jsonWebToken.js";
// import bcrypt from "bcrypt";
export const createUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const existEmail = await getEmailService(email);
        if (existEmail) return res.status(400).send({ status: "error", error: "User already exists" });

        const user = await registerUserService(req.body);

        const { _id, rol } = user;
        const jwt = generateToken({ userName, email, rol });

        res.status(200).send({ success: true, data: { _id, userName, email, rol }, jwt });
    } catch (error) {
        res.status(500).send({ success: false, data: null, error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUserService({ email, password });

        if (!user) {
            return res.status(404).send({ success: false, message: "El email no existe" });
        }

        if (user.success === false) {
            return res.status(401).send({ success: false, message: user.message });
        }

        res.status(200).send({ success: true, data: user });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send({ success: false, message: "Error en el servidor" });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await getUserByIdService(id)
        res.status(200).send({ success: true, data: user });
    } catch (error) {
        res.status(500).send({ success: false, data: null, error: error.message });
    }
}
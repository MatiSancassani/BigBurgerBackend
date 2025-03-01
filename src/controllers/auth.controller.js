import { registerUserService, getEmailService, loginUserService } from "../services/auth.services.js";
// import bcrypt from "bcrypt";
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existEmail = await getEmailService(email);
        if (existEmail) throw new Error("El email ya existe");

        const user = await registerUserService({ name, email, password });

        res.status(200).send({ success: true, data: user });
    } catch (error) {
        res.status(500).send({ success: false, data: null, error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUserService({ email, password });
        if (!user) throw new Error("El usuario no existe");

        res.status(200).send({ success: true, data: user });
    } catch (error) {
        res.status(500).send({ success: false, data: null, error: error.message });
    }
}
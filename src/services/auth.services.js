import userModel from "../dao/mongo/models/user.model.js";
import bcrypt from "bcrypt";

export const registerUserService = async ({ userName, email, password }) => {

    if (!userName || !email || !password) {
        throw new Error("Faltan datos");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        userName,
        email,
        password: hashPassword
    });

    return user;
}
export const loginUserService = async ({ email, password }) => {
    const user = await userModel.findOne({ email });
    if (!user) {
        return { success: false, message: "El usuario no existe" };
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return { success: false, message: "Contraseña incorrecta" }; // Devolver un objeto en caso de error
    }

    // const { password: _, ...userWithoutPassword } = user.toObject();
    // return userWithoutPassword;
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        rol: user.rol,
        dateOfCreation: user.dateOfCreation
    };

}

export const getEmailService = async (email) => await userModel.findOne({ email });

export const getUserByIdService = async (id) => await userModel.findById(id)

import userModel from "../dao/mongo/models/user.model.js";
import { v4 as uuidv4 } from "uuid";

export const registerUserService = async ({ userName, email, password, cart_id }) => {
    const newUser = await userModel.create({
        _id: uuidv4(),
        userName,
        email,
        password,
        cart_id
    });
    return newUser;
}

export const getUserByEmailService = async (email) => await userModel.findOne({ email });

export const getUserByIdService = async (id) => await userModel.findById(id);

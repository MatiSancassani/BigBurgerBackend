import userModel from "../dao/mongo/models/user.model.js";

export const registerUserService = async ({ userName, email, password, cart_id }) => {
    const newUser = await userModel.create({
        userName,
        email,
        password,
        cart_id
    });
    return newUser;
}

export const getUserByEmailService = async (email) => await userModel.findOne({ email });

export const getUserByIdService = async (id) => await userModel.findById(id);

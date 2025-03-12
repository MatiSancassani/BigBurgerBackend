import userModel from "../dao/mongo/models/user.model.js";

export const registerUserService = async (user) => await userModel.create(user);

export const getUserByEmailService = async (email) => await userModel.findOne({ email });

export const getUserByIdService = async (id) => await userModel.findById(id);

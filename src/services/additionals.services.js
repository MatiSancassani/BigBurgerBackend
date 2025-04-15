import additionalModel from "../dao/mongo/models/additional.model.js";
import { v4 as uuidv4 } from "uuid";


export const getAllAdditionalsService = async () => await additionalModel.find().lean();
export const getAdditionalByIdService = async (pid) => await additionalModel.findById(pid);

export const addAdditionalService = async ({ title, price, thumbnail, category }) => {
    const newAdditional = await additionalModel.create({
        title,
        price,
        thumbnail,
        category,
    })
    return newAdditional;
};
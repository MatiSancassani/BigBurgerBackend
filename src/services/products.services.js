import productModel from "../dao/mongo/models/product.model.js";
import { v4 as uuidv4 } from "uuid";

export const getAllProductsService = async () => await productModel.find().lean();

export const getProductByIdService = async (pid) => await productModel.findById(pid);
export const addProductService = async ({ title, description, price, thumbnail, stock, code, status, category }) => {
    const newProduct = await productModel.create({
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        status,
        category
    })
    return newProduct;
};
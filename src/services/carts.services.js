import cartModel from "../dao/mongo/models/cart.model.js";
import additionalModel from "../dao/mongo/models/additional.model.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const createCartService = async () => await cartModel.create({});

export const getCartByIdService = async (cid) => {
    const cart = await cartModel.findById(cid).populate("products.id").lean();

    if (!cart) return null;

    // Poblar manualmente los additionals dentro de cada producto
    for (let product of cart.products) {
        for (let i = 0; i < product.additionals.length; i++) {
            const additional = await additionalModel.findById(product.additionals[i].id).lean();
            if (additional) {
                product.additionals[i] = { ...additional, quantity: product.additionals[i].quantity };
            }
        }
    }

    return cart;
};

export const addProductInCartService = async (cid, pid, additionals = []) => {
    const cart = await cartModel.findById(cid);
    if (!cart) return null;

    const newProduct = {
        id: pid,
        quantity: 1,
        additionals: []
    };

    if (additionals.length > 0) {
        for (const additional of additionals) {
            const additionalExists = await additionalModel.findById(additional.id);
            if (!additionalExists) {
                console.log(`El adicional con ID ${additional.id} no existe.`);
                continue;
            }

            newProduct.additionals.push({
                id: additionalExists._id,
                name: additionalExists.name,
                price: additionalExists.price,
                quantity: additional.quantity ?? 1
            });
        }
    }

    cart.products.push(newProduct);
    await cart.save();
    return cart;
};

export const updateProductInCartService = async (cid, pid, quantity) =>
    await cartModel.findOneAndUpdate(
        { _id: cid, "products.id": pid },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
    );

export const deleteProductInCartService = async (cid, productInCartId) => {
    return await cartModel.findByIdAndUpdate(
        cid,
        { $pull: { products: { productInCartId } } },
        { new: true }
    );
};

export const deleteAllProductsService = async (cid) =>
    await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
//  await cartModel.findByIdAndDelete(cid); // Eliminariamos todo el carrito

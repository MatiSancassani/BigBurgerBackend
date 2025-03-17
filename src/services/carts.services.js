import cartModel from "../dao/mongo/models/cart.model.js";

export const createCartService = async () => await cartModel.create({});

export const getCartByIdService = async (cid) => await cartModel.findById(cid).populate("products.id").lean();

export const addProductInCartService = async (cid, pid) => {
    const cart = await cartModel.findById(cid);

    if (!cart) {
        return null;
    }
    const productInCart = cart.products.find((p) => p.id.toString() === pid);

    if (productInCart) productInCart.quantity++;
    else cart.products.push({ id: pid, quantity: 1 });

    cart.save();

    return cart;
};
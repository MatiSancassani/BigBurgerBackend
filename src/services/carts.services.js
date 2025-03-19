import cartModel from "../dao/mongo/models/cart.model.js";
import additionalModel from "../dao/mongo/models/additional.model.js";

export const createCartService = async () => await cartModel.create({});

export const getCartByIdService = async (cid) => await cartModel.findById(cid).populate("products.id").lean();

export const addProductInCartService = async (cid, pid, additionals = []) => {
    const cart = await cartModel.findById(cid);

    if (!cart) {
        return null;
    }
    const productInCart = cart.products.find((p) => p.id.toString() === pid);
    if (productInCart) productInCart.quantity++;
    else cart.products.push({ id: pid, quantity: 1 });


    if (additionals.length > 0) {
        for (const additional of additionals) {
            const id = additional.id;
            const quantity = additional.quantity ?? 1; // Si no tiene quantity, asigna 1

            // Verificar si el adicional existe en la base de datos
            const additionalExists = await additionalModel.findById(id);
            if (!additionalExists) {
                console.log(`El adicional con ID ${id} no existe.`);
                continue; // Ignorar adicionales inexistentes
            }

            // Verificar si el adicional ya está en el carrito
            const additionalInCart = cart.additionals.find((a) => a.id.toString() === id);
            if (additionalInCart) {
                additionalInCart.quantity += quantity; // Si ya está, suma la cantidad
            } else {
                cart.additionals.push({ id, quantity }); // Si no está, lo agrega con quantity 1
            }
        }
    }


    cart.save();
    return cart;
};

export const updateProductInCartService = async (cid, pid, quantity) =>
    await cartModel.findOneAndUpdate(
        { _id: cid, "products.id": pid },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
    );

export const deleteProductInCartService = async (cid, pid) =>
    await cartModel.findByIdAndUpdate(cid, { $pull: { products: { id: pid } } }, { new: true });

export const deleteAllProductsService = async (cid) =>
    await cartModel.findByIdAndUpdate(cid, { $set: { products: [], additionals: [] } }, { new: true });
//  await cartModel.findByIdAndDelete(cid); // Eliminariamos todo el carrito

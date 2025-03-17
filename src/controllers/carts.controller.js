import { v4 as uuidv4 } from "uuid";
import {
    getCartByIdService,
    createCartService,
    addProductInCartService
} from "../services/carts.services.js";
import { getProductByIdService } from "../services/products.services.js";
import { getUserByIdService } from "../services/auth.services.js";

export const getCartIdService = async (req, res) => {
    try {
        const cartId = req.user.cart_id;
        res.status(200).send({ cartId });
    } catch (error) {
        console.log("getCartId ->", error);
        res.status(500).send({ payload: null, error: error.message });
    }
}

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        // const cart = await getCartByIdService(cid); //Traemos todas las propiedades dentro del cart
        const cart = await getCartByIdService(cid);

        res.status(200).send({ payload: { cart } });
    } catch (error) {
        console.log("getCartById ->", error);
        res.status(500).send({ payload: null, error: error.message });
    }
};

export const addCart = async (req, res) => {
    try {
        const cart = await createCartService();
        // const cart = await CartsRepository.createCart();
        res.status(200).send({ payload: cart });
    } catch (err) {
        console.log("addCart ->", err);
        res.status(500).send({ payload: null, error: err.message });
    }
};

export const addProductInCart = async (req, res) => {
    try {
        const { id } = req.user;
        const { cid, pid } = req.params;

        const user = await getUserByIdService(id);
        const product = await getProductByIdService(pid);

        if (!product) return res.status(400).send({ msg: "Product no existe" });

        const cartUser = user.cart_id._id.toString();

        // if (!(cartUser === cid)) return res.status(400).send({ msg: 'No puedes agregar productos a un carrito que no te pertenece' });

        // if (user.rol === 'user') {
        //     return res.status(400).send({ msg: 'Requieres rol Premium para agregar productos al carrito' });
        // }

        // if (user.rol === 'premium' && product.owner === user.email) {
        //     return res.status(400).send({ msg: 'No puedes agregar tu propio producto al carrito' });
        // }

        const cart = await addProductInCartService(cid, pid);

        if (!cart) {
            console.log('El carrito no existe')
        }
        res.status(200).send({ payload: cart });
    } catch (err) {
        console.log("addProductInCart ->", err);
        res.status(500).send({ payload: null, error: err.message });
    }
};

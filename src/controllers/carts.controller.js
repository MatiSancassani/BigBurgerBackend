import mongoose from "mongoose";
import {
    getCartByIdService,
    createCartService,
    addProductInCartService,
    updateProductInCartService,
    deleteAllProductsService,
    deleteProductInCartService
} from "../services/carts.services.js";
import { getProductByIdService } from "../services/products.services.js";
import additionalModel from "../dao/mongo/models/additional.model.js";

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

        res.status(200).send({ data: cart });
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
        const { cid, pid } = req.params;
        const { additionals } = req.body;

        const product = await getProductByIdService(pid);
        if (!product) return res.status(400).send({ msg: "Product no existe" });

        const cart = await addProductInCartService(cid, pid, additionals || []);
        if (!cart) {
            console.log('El carrito no existe')
        }


        res.status(200).send({ payload: cart });
    } catch (err) {
        console.log("addProductInCart ->", err);
        res.status(500).send({ payload: null, error: err.message });
    }
};


export const updateProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const product = await getProductByIdService(pid);
        // if(!(user.cart_id.toString() === cid)) return res.status(400).send( {msg: 'Cart no valido'});
        if (!product) return res.status(400).send({ msg: "Product no existe" });

        if (!quantity || !Number.isInteger(quantity)) {
            console.log("Debe ser un numero entero");
        }
        // const cart = await updateProductInCartService(cid, pid, quantity);
        const cart = await updateProductInCartService(cid, pid, quantity);
        res.status(200).send({ payload: { cart } });
    } catch (err) {
        console.log("updateProductInCart ->", err);
        res.status(500).send({ payload: null, error: err.message });
    }
};

export const deleteProductInCart = async (req, res) => {
    try {
        const { cid, productInCartId } = req.params;

        const cart = await deleteProductInCartService(cid, productInCartId);
        if (!cart) return res.status(404).send({ msg: "Carrito no encontrado" });

        res.status(200).send({ payload: { cart } });
    } catch (err) {
        console.log("deleteProductInCart ->", err);
        res.status(500).send({ payload: null, error: err.message });
    }
};

export const deleteAllProducts = async (req, res) => {
    try {
        const { cid } = req.params;
        // const cart = await deleteAllProductsService(cid);
        const cart = await deleteAllProductsService(cid);

        // const cart = await cartModel.findByIdAndDelete(cid); // Eliminariamos todo el carrito
        res.status(200).send({ payload: { cart } });
    } catch (err) {
        console.log("deleteAllProducts ->", err);
        res.status(500).send({ payload: null, error: err.message });
    }
};
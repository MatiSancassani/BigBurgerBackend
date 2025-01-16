import { getAllProductsService, addProductService, getProductByIdService } from "../services/products.services.js";
export const getProduct = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.status(200).send({ success: true, data: products });
    } catch (error) {
        res.status(500).send({ success: false, data: null, error: error.message });
    }

};
export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await getProductByIdService(pid);
        if (!product) {
            res.status(404).send({ msg: "El producto no existe" });
        }
        res.status(200).send({ success: true, data: product });
    } catch (err) {
        console.log("getById ->", err);
        res.status(500).send({ success: false, data: null, error: error.message });
    }
};
export const addProduct = async (req, res) => {
    try {
        const { title, description, price, stock, category, code, status } = req.body;
        const thumbnail = req.file ? `/public/uploads/${req.file.filename}` : null;

        if (!title || !description || !price || !stock || !category || !thumbnail) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const productBody = {
            title,
            description,
            price,
            thumbnail,
            stock,
            code,
            status,
            category
        };
        const product = await addProductService(productBody);

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log("add ->", error);
        res.status(500).send({ success: false, data: null, error: error.message });
    }

}
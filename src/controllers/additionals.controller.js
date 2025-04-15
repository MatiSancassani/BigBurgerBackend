import { getAllAdditionalsService, getAdditionalByIdService, addAdditionalService } from "../services/additionals.services.js";
import { uploadToGCS } from "../utils/uploader.js";

export const getAdditional = async (req, res) => {
    try {
        const additionals = await getAllAdditionalsService();
        res.status(200).send({ success: true, data: additionals });
    } catch (error) {
        res.status(500).send({ success: false, data: null, error: error.message });
    }

};

export const getAdditionalById = async (req, res) => {
    try {
        const { pid } = req.params;
        const additional = await getAdditionalByIdService(pid);
        if (!additional) {
            res.status(404).send({ msg: "El additional no existe" });
        }
        res.status(200).send({ success: true, data: additional });
    } catch (err) {
        console.log("getAdditionalById ->", err);
        res.status(500).send({ success: false, data: null, error: err.message });
    }
};

export const addAdditional = async (req, res) => {
    try {
        const { title, price, category } = req.body;
        if (!title || !price || !category) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
        let thumbnail = null;
        if (req.file) {
            thumbnail = await uploadToGCS(req.file, "additionals");
        } else {
            return res.status(400).json({ error: "La imagen es obligatoria" });
        }

        const additionalBody = {
            title,
            price,
            thumbnail,
            category
        };
        const additional = await addAdditionalService(additionalBody);

        res.status(200).json({ success: true, data: additional });
    } catch (error) {
        console.log("addAdditional ->", error);
        res.status(500).send({ success: false, data: null, error: error.message });
    }

}


import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "additional";

const additionalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true, enum: ['agregados', 'bebidas', 'carnes', 'combo'] },
}, { versionKey: false });

const additionalModel = mongoose.model(collection, additionalSchema);

export default additionalModel;
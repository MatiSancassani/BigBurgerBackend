import { mongoose } from "mongoose";

mongoose.pluralize(null);

const collection = "products";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean },
    category: {
        type: String,
        enum: ['Classic', 'BBQ', 'Bacon', 'Chicken', 'Vegan'],
        default: 'Classic',
        required: true
    },
}, { versionKey: false });

const productModel = mongoose.model(collection, productSchema);

export default productModel;

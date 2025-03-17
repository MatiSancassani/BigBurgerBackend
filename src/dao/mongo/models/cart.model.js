import { mongoose, Schema, SchemaTypes } from "mongoose";
import { v4 as uuidv4 } from "uuid";

mongoose.pluralize(null);

const collection = "cart";

const cartsSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        products: [
            {
                _id: false,
                id: {
                    type: SchemaTypes.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    required: [true, "La cantidad del producto es obligatoria"],
                },
            },
        ],
    },
    { versionKey: false }
);

const cartModel = mongoose.model(collection, cartsSchema);

export default cartModel;

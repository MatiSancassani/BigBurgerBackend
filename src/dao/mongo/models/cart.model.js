import { mongoose, Schema, SchemaTypes } from "mongoose";
import { v4 as uuidv4 } from "uuid";

mongoose.pluralize(null);

const collection = "cart";

const cartsSchema = new mongoose.Schema(
    {
        products: [
            {
                _id: false,
                productInCartId: { type: String, default: uuidv4 },
                id: {
                    type: SchemaTypes.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    required: [true, "La cantidad del producto es obligatoria"],
                },

                additionals: [
                    {
                        _id: false,
                        id: {
                            type: String, // El _id en additionalModel es String
                            ref: "additional",
                        },
                        quantity: {
                            type: Number,
                            required: [true, "La cantidad del adicional es obligatoria"],
                        },
                    },
                ],
            },
        ],
    },
    { versionKey: false }
);

const cartModel = mongoose.model(collection, cartsSchema);

export default cartModel;

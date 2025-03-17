import { mongoose, SchemaTypes } from "mongoose";

mongoose.pluralize(null);

const collection = "users";

const usersSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: Boolean, default: "false" },
    cart_id: {
        type: String,
        ref: 'cart'
    },
    dateOfCreation: { type: Date, default: Date.now() },
}, { versionKey: false });

const userModel = mongoose.model(collection, usersSchema);

export default userModel;

import { mongoose, SchemaTypes } from "mongoose";

mongoose.pluralize(null);

const collection = "users";

const usersSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: function () { return !this.isOAuth; } },
    isOAuth: { type: Boolean, default: false }, // Nuevo campo para saber si se registró con OAuth
    rol: { type: Boolean, default: "false" },
    cart_id: {
        type: String,
        ref: 'cart'
    },
    dateOfCreation: { type: Date, default: Date.now() },
}, { versionKey: false });

const userModel = mongoose.model(collection, usersSchema);

export default userModel;

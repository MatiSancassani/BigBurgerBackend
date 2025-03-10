import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "users";

const usersSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, default: "user", enum: ['user', 'admin'] },
    dateOfCreation: { type: Date, default: Date.now() },
}, { versionKey: false });

const userModel = mongoose.model(collection, usersSchema);

export default userModel;

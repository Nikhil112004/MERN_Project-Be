import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://dev_nikhil:dev_nikhil28@cluster0.h2xpg.mongodb.net/BitsAndVolts");

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: String,
    gender: String,
    status: String,
    profilePic: String,
    location: String
});

export const CreateUserModel = model("User", UserSchema);
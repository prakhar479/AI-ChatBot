import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: randomUUID()
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    messages: {
        type: String,
        required: true,
        default: ''
    }
});
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    lastname: {
        type: String,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    chats: [chatsSchema],
});
export default mongoose.model("user", userSchema);
//# sourceMappingURL=user.js.map
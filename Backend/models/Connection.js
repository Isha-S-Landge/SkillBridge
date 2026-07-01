import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema({
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true
    },
    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Connection", ConnectionSchema);
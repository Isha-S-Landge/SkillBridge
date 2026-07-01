import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    skillOffered: {
        type: String,
        required: true
    },
    category: {
    type: String,
    enum: ["Coding", "Design", "Music", "Language", "Business", "Career", "Creative", "Other"],
    required: true
    },
    skillWanted: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Skill", SkillSchema);
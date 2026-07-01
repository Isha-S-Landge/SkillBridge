import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        default: ""
    },
    skillsToTeach: [{
        type: String
    }],
    skillsToLearn: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
    type: String,
    },
    resetPasswordExpires: {
    type: Date,
    },
});

export default mongoose.model("User", UserSchema);
import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Connection",
        required: true
    },
    raterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ratedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Rating", RatingSchema);
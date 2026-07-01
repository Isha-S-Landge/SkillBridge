import express from "express";
import Rating from "../models/Rating.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Submit a rating
router.post("/", authMiddleware, async (req, res) => {
    const { connectionId, ratedUserId, rating, review } = req.body;

    try {
        const newRating = new Rating({
            connectionId,
            raterId: req.user.userId,
            ratedUserId,
            rating,
            review
        });
        await newRating.save();
        res.json({ message: "Rating submitted!", newRating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all ratings for a specific user (to show average rating on profile)
router.get("/:userId", async (req, res) => {
    try {
        const ratings = await Rating.find({ ratedUserId: req.params.userId });
        const avgRating = ratings.length
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0;
        res.json({ ratings, avgRating });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
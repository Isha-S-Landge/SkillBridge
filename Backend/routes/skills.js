import express from "express";
import Skill from "../models/Skill.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Post a new skill
router.post("/", authMiddleware, async (req, res) => {
    const { skillOffered, category, skillWanted, description } = req.body;

    if (!skillOffered || !category || !skillWanted) {
        return res.status(400).json({ error: "Required fields are missing" });
    }

    try {
        const skill = new Skill({
            userId: req.user.userId,
            skillOffered,
            category,
            skillWanted,
            description
        });
        await skill.save();
        res.json({ message: "Skill posted successfully!", skill });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all skills (for Explore page)
router.get("/", async (req, res) => {
    try {
        const skills = await Skill.find().populate("userId", "name city");
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get skills posted by logged in user (for Profile page)
router.get("/my-skills", authMiddleware, async (req, res) => {
    try {
        const skills = await Skill.find({ userId: req.user.userId });
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a skill
router.delete("/:skillId", authMiddleware, async (req, res) => {
    try {
        const skill = await Skill.findOneAndDelete({
            _id: req.params.skillId,
            userId: req.user.userId
        });
        if (!skill) {
            return res.status(404).json({ error: "Skill not found" });
        }
        res.json({ message: "Skill deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
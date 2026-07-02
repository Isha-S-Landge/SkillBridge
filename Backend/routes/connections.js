import express from "express";
import Connection from "../models/Connection.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Send a connection request
router.post("/", authMiddleware, async (req, res) => {
    const { skillId, receiverId } = req.body;

    try {
        const existing = await Connection.findOne({
            skillId,
            requesterId: req.user.userId,
        });

        if (existing) {
            return res.status(400).json({ error: "You already sent a request for this skill" });
        }

        const connection = new Connection({
            skillId,
            requesterId: req.user.userId,
            receiverId
        });
        await connection.save();
        res.json({ message: "Connection request sent!", connection });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all connection requests received by logged in user
router.get("/received", authMiddleware, async (req, res) => {
    try {
        const connections = await Connection.find({ receiverId: req.user.userId })
            .populate("requesterId", "name city email")
            .populate("skillId", "skillOffered");
        res.json(connections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all connection requests sent by logged in user
router.get("/sent", authMiddleware, async (req, res) => {
    try {
        const connections = await Connection.find({ requesterId: req.user.userId })
            .populate("receiverId", "name city email")
            .populate("skillId", "skillOffered");
        res.json(connections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Accept or reject a connection request
router.patch("/:connectionId", authMiddleware, async (req, res) => {
    const { status } = req.body;

    try {
        const connection = await Connection.findOneAndUpdate(
            { _id: req.params.connectionId, receiverId: req.user.userId },
            { status },
            { new: true }
        );
        if (!connection) {
            return res.status(404).json({ error: "Connection not found" });
        }
        res.json({ message: `Connection ${status}!`, connection });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
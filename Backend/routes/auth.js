import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            city,
        });
        await user.save();

        const token = generateToken(user);
        res.json({ token, name: user.name, email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = generateToken(user);
        res.json({ token, name: user.name, email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});

export default router;
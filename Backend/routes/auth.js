import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import { generateResetToken } from "../utils/generateResetToken.js";

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

// Forgot Password — generate a reset token
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(400).json({ error: "No account found with this email" });
        }

        const { rawToken, hashedToken } = generateResetToken();

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();

        // No real email service — return the link directly (demo mode)
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

        res.json({
            message: "Reset link generated",
            resetLink, // shown on screen since we're not sending real email
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});

// Reset Password — verify token and set new password
router.post("/reset-password/:token", async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
        return res.status(400).json({ error: "New password is required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: "Reset link is invalid or has expired" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password reset successful. You can now log in." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});

export default router;
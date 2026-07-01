import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import skillRoutes from "./routes/skills.js";
import connectionRoutes from "./routes/connections.js";
import ratingRoutes from "./routes/ratings.js";

const app = express();
const PORT = 8081;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/ratings", ratingRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

connectDB();
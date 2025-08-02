import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import internRoutes from "./routes/internRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow your Vercel frontend + local development
const allowedOrigins = [
    "https://fundraising-portal-mvp.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

connectDB();
app.use("/api", internRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import internRoutes from "./routes/internRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow your Vercel frontend (update the URL after deployment)
app.use(cors({
    origin: ["https://your-frontend.vercel.app"], // replace with your Vercel frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB
connectDB();

// ✅ Root route for testing
app.get("/", (req, res) => {
    res.send("✅ Backend is working");
});

// ✅ API routes
app.use("/api", internRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

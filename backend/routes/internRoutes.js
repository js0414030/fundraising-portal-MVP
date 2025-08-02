import express from "express";
import Intern from "../models/Intern.js";

const router = express.Router();

/* ✅ Signup (Register new intern) */
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existing = await Intern.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        // Create new intern
        const newUser = await Intern.create({
            name,
            email,
            password,
            referralCode: email.split("@")[0] + "2025",
            totalDonations: 0,
            rewards: [
                { title: "Bronze Badge", unlock: "₹5000+" },
                { title: "Silver Badge", unlock: "₹10,000+" },
                { title: "Gold Badge", unlock: "₹20,000+" },
            ],
            donationsHistory: [
                { month: "Jan", amount: 0 },
                { month: "Feb", amount: 0 },
                { month: "Mar", amount: 0 },
            ]
        });

        res.status(201).json({ id: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

/* 🔑 Login (validate email & password) */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await Intern.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ id: user._id });
});

// 💰 Add Donation
router.post("/donate/:id", async (req, res) => {
    const { amount } = req.body;
    const user = await Intern.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update total donations
    user.totalDonations += Number(amount);

    // Find current month
    const currentMonth = new Date().toLocaleString("default", { month: "short" }); // e.g. "Aug"

    // Check if month exists in donationsHistory
    const existingMonth = user.donationsHistory.find(d => d.month === currentMonth);
    if (existingMonth) {
        existingMonth.amount += Number(amount);
    } else {
        user.donationsHistory.push({ month: currentMonth, amount: Number(amount) });
    }

    await user.save();
    res.json(user);
});

/* 📊 Get Dashboard Data */
router.get("/dashboard/:id", async (req, res) => {
    const user = await Intern.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

/* 🏆 Get Leaderboard */
router.get("/leaderboard", async (req, res) => {
    const leaderboard = await Intern.find().sort({ totalDonations: -1 }).limit(10);
    res.json(leaderboard);
});

export default router;

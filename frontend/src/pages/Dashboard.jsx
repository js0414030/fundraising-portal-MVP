import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import DonationChart from "../components/Chart";

export default function Dashboard() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [data, setData] = useState(null);
    const [donation, setDonation] = useState("");
    const navigate = useNavigate();
    const id = localStorage.getItem("userId");

    const fetchData = () => {
        fetch(`https://fundraising-portal-mvp.onrender.com/api/dashboard/${id}`)
            .then(res => res.json())
            .then(setData)
            .catch(() => navigate("/"));
    };

    useEffect(() => {
        if (!id) {
            navigate("/");
            return;
        }
        fetchData();
    }, [id]);

    const handleDonate = async () => {
        if (!donation || Number(donation) <= 0) return;
        await fetch(`https://fundraising-portal-mvp.onrender.com/api/donate/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: Number(donation) }),
        });
        setDonation("");
        fetchData();
    };

    if (!data) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Welcome, {data.name} 👋</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={toggleTheme}
                            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        >
                            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("userId");
                                navigate("/");
                            }}
                            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="mb-2">Referral Code: <b>{data.referralCode}</b></p>
                    <p className="mb-4">Total Donations: <b>₹{data.totalDonations}</b></p>

                    <div className="flex gap-3">
                        <input
                            type="number"
                            value={donation}
                            onChange={(e) => setDonation(e.target.value)}
                            placeholder="Enter donation amount"
                            className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                        <button
                            onClick={handleDonate}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Add Donation
                        </button>
                    </div>
                </div>

                <DonationChart donations={data.donationsHistory} />

                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate("/leaderboard")}
                        className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                    >
                        View Leaderboard
                    </button>
                </div>
            </div>
        </div>
    );
}

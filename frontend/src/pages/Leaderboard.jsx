import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/leaderboard")
            .then(res => res.json())
            .then(setLeaders);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center">
                <div className="flex justify-between w-full items-center mb-6">
                    <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>

                <div className="w-full overflow-x-auto mb-6">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="py-3 px-4">Rank</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Total Donations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className={`border-b dark:border-gray-700 ${index === 0 ? "bg-yellow-100 dark:bg-yellow-700" : ""
                                        }`}
                                >
                                    <td className="py-2 px-4 font-bold">{index + 1}</td>
                                    <td className="py-2 px-4">{user.name}</td>
                                    <td className="py-2 px-4 font-semibold">₹{user.totalDonations}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-5 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}

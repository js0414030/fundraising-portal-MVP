import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const res = await fetch("https://fundraising-portal-mvp.onrender.com/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.status === 401) {
            setError("Invalid credentials. Try again or sign up.");
            return;
        }
        const data = await res.json();
        localStorage.setItem("userId", data.id);
        navigate("/dashboard");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Intern Login</h1>
                {error && <p className="text-red-600 text-center mb-2">{error}</p>}
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="Email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 border rounded mb-4" placeholder="Password" />
                <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">Login</button>
                <p className="text-sm mt-3">Don’t have an account? <span onClick={() => navigate("/signup")} className="text-purple-600 cursor-pointer">Sign Up</span></p>
            </div>
        </div>
    );
}

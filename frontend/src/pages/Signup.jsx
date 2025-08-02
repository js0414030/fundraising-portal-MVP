import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async () => {
        const res = await fetch("https://fundraising-portal-mvp.onrender.com/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.status === 400) {
            setError("User already exists. Please login.");
            setTimeout(() => navigate("/"), 2000);
            return;
        }

        const data = await res.json();
        localStorage.setItem("userId", data.id);
        navigate("/dashboard");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Create Account</h1>
                {error && <p className="text-red-600 text-center mb-2">{error}</p>}
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="Full Name" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="Email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-2 border rounded mb-4" placeholder="Password" />
                <button onClick={handleSignup} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition">Sign Up</button>
                <p className="text-sm mt-3">Already have an account? <span onClick={() => navigate("/")} className="text-blue-600 cursor-pointer">Login</span></p>
            </div>
        </div>
    );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/authSlice";
import type { AppDispatch } from "@/state/store";
import { registerUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordHash, setPassword] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isValidPhone = (phone: string) => {
        if (countryCode === "+63") {
            return /^(?:\+63|0)?9\d{9}$/.test(phone); // Philippines format
        } else if (countryCode === "+1") {
            return /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/.test(phone); // USA format
        }
        return false;
    }

    const normalizePhone = (phone: string) => phone.replace(/\D/g, "");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidPhone(phone)) {
            alert("Invalid phone number format for the selected country code.");
            return;
        } else {
            try {
                setPhone(countryCode + normalizePhone(phone)); // Combine country code with phone number remove dashes/spaces
                const userData = await registerUser({ fullName, email, passwordHash, phone });
                dispatch(setUser(userData));
                navigate("/dashboard"); // Redirect to dashboard or home page
            } catch (error) {
                // Handle error (e.g., show error message)
                alert("Register failed.");
                console.error("Register failed:", error);
            }
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <form onSubmit={handleRegister} className="p-6 rounded-2xl shadow-lg border border-white/30 w-full max-w-md bg-white/1 backdrop-blur-md">
                <h2 className="text-3xl mb-6 font-semibold text-white text-center">Register</h2>
                <div className="mb-4">
                    <input
                        type="name"
                        id="name"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-black-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-xl border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-black-400"
                        required
                    />
                </div>
                <div className="mb-4 flex items-center space-x-2">
                    <select
                        id="countryCode"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="p-3 rounded-xl border border-white/30 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-black-400"
                    >
                        <option value="+1" className="text-black">+1 (USA)</option>
                        <option value="+63" className="text-black">+63 (PH)</option>
                    </select>
                    <input
                        type="phone"
                        id="phone"
                        placeholder="Phone (optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-black-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={passwordHash}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-xl border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-black-400"
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white p-2 rounded hover:bg-blue-600">Sign Up!</button>
            </form>
        </div>
    );
};

export default Register;

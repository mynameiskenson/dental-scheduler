import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/authSlice";
import { loginUser } from "@/services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Redirect or show success message
            const userData = await loginUser({ email, password });
            dispatch(setUser(userData));
            navigate("/dashboard"); // Redirect to dashboard or home page
        } catch (error) {
            // Handle error (e.g., show error message)
            alert("Login failed. Please check your credentials.");
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <form onSubmit={handleLogin} className="p-6 rounded-2xl shadow-lg border border-white/30 w-full max-w-md bg-white/1 backdrop-blur-md">
                <h2 className="text-3xl mb-6 font-semibold text-white text-center">Login</h2>
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
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-xl border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-black-400"
                        required
                    />
                </div>
                <button type="submit" className="w-full text-white p-2 rounded hover:bg-blue-600">Login</button>

                <div className="mt-4 text-center text-white">
                    Don't have an account? <span
                        onClick={() => navigate("/register")}
                        className="text-blue-400 hover:underline cursor-pointer"
                    >
                        Sign Up!
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;

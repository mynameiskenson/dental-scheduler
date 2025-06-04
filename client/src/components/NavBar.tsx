import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { RootState } from "@/state/store";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Assuming you have a user state in your Redux store
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        dispatch({ type: "auth/logout" });
        navigate("/");
    }

    return (
        <nav className="fixed top-0 left-0 w-full z-20 bg-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo / Brand */}
                <div className="text-white font-bold text-xl cursor-pointer select-none">
                    Tooth Fairy
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-white">
                    <li>
                        <Link to="/" className="hover:text-blue-400 transition">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/book" className="hover:text-blue-400 transition">
                            Book Now!
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-blue-400 transition">
                            About Us
                        </Link>
                    </li>
                    {user ? (
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent page jump
                                    handleLogout();
                                }}
                                className="hover:text-blue-400 transition"
                            >
                                Logout
                            </a>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="hover:text-blue-400 transition">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden bg-black text-white p-2 rounded focus:outline-none z-40"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-16 left-0 w-full transform transition-all duration-300 ease-in-out 
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
          bg-transparent text-black backdrop-blur-md flex flex-col items-center space-y-6 py-6 md:hidden z-20`}
            >
                <Link
                    to="/"
                    className="hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    Home
                </Link>
                <Link
                    to="/book"
                    className="hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    Book Now!
                </Link>
                <Link
                    to="/about"
                    className="hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    About Us
                </Link>
                {user ? (
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                            setIsOpen(false); // Close mobile menu
                        }}
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        Logout
                    </a>
                ) : (
                    <Link
                        to="/login"
                        className="hover:text-blue-600 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
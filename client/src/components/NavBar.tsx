import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                        <a href="#home" className="hover:text-blue-400 transition">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#book" className="hover:text-blue-400 transition">
                            Book Now!
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-blue-400 transition">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a href="#login" className="hover:text-blue-400 transition">
                            Login
                        </a>
                    </li>
                </ul>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden bg-black text-black p-2 rounded focus:outline-none z-40"
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
                <a
                    href="#home"
                    className="hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    Home
                </a>
                <a
                    href="#book"
                    className="hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    Book Now!
                </a>
                <a
                    href="#about"
                    className="hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    About Us
                </a>
                <a
                    href="#login"
                    className="hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    Login
                </a>
            </div>
        </nav>
    );
}
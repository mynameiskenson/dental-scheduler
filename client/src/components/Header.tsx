import Navbar from "./NavBar";

export default function Header() {
    return (
        <header className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Navbar />
            </div>
        </header>
    );
}
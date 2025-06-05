import { Outlet } from "react-router-dom";
import bgVideo from "@/assets/background.mp4";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="relative w-screen h-screen text-white">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute w-full h-full bg-black/70 -z-10" />

            {/* Page Structure */}
            <div className="relative flex flex-col h-full z-10">
                <Header />
                <main className="flex-1 overflow-auto flex justify-center items-center px-4 py-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
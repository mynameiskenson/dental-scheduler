import bgVideo from "@/assets/background.mp4";

export default function LoadingScreen() {
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

            {/* Centered Spinner or Text */}
            <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto" />
                    <p className="text-lg text-white/80">Loading, please wait...</p>
                </div>
            </div>
        </div>
    );
}
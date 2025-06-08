export default function About() {
    return (
        <div className="flex h-full items-start sm:items-center justify-center px-4 pt-[40px] sm:pt-0 pb-10">
            <div className="p-6 rounded-2xl shadow-lg border border-white/30 w-full max-w-3xl bg-white/5 backdrop-blur-md text-white space-y-6">
                <h1 className="text-3xl font-bold text-center">About Us</h1>
                <p className="text-white/80 text-center text-sm sm:text-base">
                    Welcome to <strong>Tooth Fairy</strong> — your trusted companion for effortless dental appointment management.
                </p>
                <p className="text-white/80 text-sm sm:text-base">
                    We created this platform to simplify how patients and dental clinics connect. With just a few clicks, patients can view available time slots, book appointments, and reschedule or cancel when needed, all from the comfort of their home.
                </p>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
                    <p className="text-white/80 text-sm sm:text-base">
                        To modernize and streamline dental appointment scheduling, reducing missed appointments and improving communication between patients and dental professionals.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
                    <ul className="list-disc pl-6 text-white/80 text-sm sm:text-base space-y-2">
                        <li><strong>Real-Time Scheduling:</strong> Browse and book available dentist slots.</li>
                        <li><strong>Easy Rescheduling:</strong> Change your appointment in seconds with our user-friendly reschedule feature.</li>
                        <li><strong>Secure Login:</strong> Stay protected with secure, token-based authentication (JWT).</li>
                        <li><strong>Notifications:</strong> Get timely updates via WhatsApp and email for your bookings and changes.</li>
                        <li><strong>Responsive Design:</strong> Access the platform easily from desktop or mobile devices.</li>
                    </ul>
                </div>

                <p className="text-white/80 text-sm sm:text-base">
                    Whether you're a dental clinic looking to optimize operations or a patient wanting a hassle-free experience, <strong>Tooth Fairy</strong> is designed with you in mind.
                </p>
            </div>
        </div>
    );
}
export default function Footer() {
    return (
        <footer className="bg-white/1 backdrop-blur-md text-white p-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Tooth Fairy. All rights reserved.</p>
            </div>
        </footer>
    );
}
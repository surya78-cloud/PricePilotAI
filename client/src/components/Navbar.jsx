import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name") || "User";

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("name");

        navigate("/login");
    };

    return (

        <nav className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-lg sticky top-0 z-50">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4">

                <Link
                    to="/"
                    className="text-2xl md:text-3xl font-extrabold text-white"
                >
                    💰 PricePilot AI
                </Link>

                {/* Desktop Menu */}

                <div className="hidden md:flex items-center gap-6">

                    <Link to="/" className="text-white hover:text-yellow-300">
                        🏠 Home
                    </Link>

                    {token && (
                        <>
                            <Link
                                to="/wishlist"
                                className="text-white hover:text-pink-300"
                            >
                                ❤️ Wishlist
                            </Link>

                            <Link
                                to="/compare"
                                className="text-white hover:text-cyan-300"
                            >
                                ⚖️ Compare
                            </Link>
                        </>
                    )}

                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:text-yellow-300"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-semibold">
                                👋 {userName}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

                {/* Mobile Menu Button */}

                <button
                    className="md:hidden text-white text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

            </div>

            {/* Mobile Menu */}

            {menuOpen && (

                <div className="md:hidden bg-indigo-800 px-4 pb-4 flex flex-col gap-4">

                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="text-white"
                    >
                        🏠 Home
                    </Link>

                    {token && (
                        <>
                            <Link
                                to="/wishlist"
                                onClick={() => setMenuOpen(false)}
                                className="text-white"
                            >
                                ❤️ Wishlist
                            </Link>

                            <Link
                                to="/compare"
                                onClick={() => setMenuOpen(false)}
                                className="text-white"
                            >
                                ⚖️ Compare
                            </Link>
                        </>
                    )}

                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold text-center"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <span className="text-white">
                                👋 {userName}
                            </span>

                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="bg-red-500 text-white py-2 rounded-lg"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            )}

        </nav>

    );
}

export default Navbar;
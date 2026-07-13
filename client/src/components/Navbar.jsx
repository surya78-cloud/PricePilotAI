import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name") || "User";

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("name");

        navigate("/login");
    };

    return (

        <nav className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-lg sticky top-0 z-50">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                <Link
                    to="/"
                    className="text-3xl font-extrabold text-white tracking-wide"
                >
                    💰 PricePilot AI
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="text-white hover:text-yellow-300 transition"
                    >
                        🏠 Home
                    </Link>

                    {token && (
                        <>
                            <Link
                                to="/wishlist"
                                className="text-white hover:text-pink-300 transition"
                            >
                                ❤️ Wishlist
                            </Link>

                            <Link
                                to="/compare"
                                className="text-white hover:text-cyan-300 transition"
                            >
                                ⚖️ Compare
                            </Link>
                        </>
                    )}

                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:text-yellow-300 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
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
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;
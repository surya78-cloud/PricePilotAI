import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import {
    getWishlist,
    removeWishlist
} from "../services/wishlist.service";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = async () => {
        try {
            const res = await getWishlist();
            setWishlist(res.wishlist);
        } catch (error) {
            console.error("Wishlist Error:", error);
        }
    };

    const handleRemove = async (id) => {

        try {

            await removeWishlist(id);

            // Update UI instantly
            setWishlist((prev) =>
                prev.filter((item) => item._id !== id)
            );

            toast.success("Removed from wishlist");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to remove item."
            );

        }

    };

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-4xl font-bold text-center mb-8">
                    ❤️ My Wishlist
                </h1>

                {wishlist.length === 0 ? (

                    <div className="text-center mt-20">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            Your wishlist is empty.
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Search for products and add them to your wishlist.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {wishlist.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
                            >

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />

                                <h2 className="text-xl font-bold mt-4">
                                    {item.title}
                                </h2>

                                <p className="text-2xl font-bold text-green-600 mt-2">
                                    ₹{item.price}
                                </p>

                                <p className="text-gray-600 mt-1">
                                    Seller: {item.seller}
                                </p>

                                <div className="flex gap-3 mt-5">

                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                                    >
                                        Visit Product
                                    </a>

                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
                                    >
                                        🗑 Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
        </>
    );
}

export default Wishlist;
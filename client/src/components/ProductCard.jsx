import toast from "react-hot-toast";
import { addToWishlist } from "../services/wishlist.service";
import { useCompare } from "../context/compare.context";

function ProductCard({ product }) {

    const {
        compareProducts,
        addToCompare
    } = useCompare();

    const handleWishlist = async () => {

        try {

            await addToWishlist(product);

            toast.success("Added to Wishlist ❤️");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add to wishlist."
            );

        }

    };

    const handleCompare = () => {

        const exists = compareProducts.find(
            (p) => p.id === product.id
        );

        if (exists) {

            toast("Already added for comparison");

            return;

        }

        if (compareProducts.length >= 2) {

            toast.error("You can compare only 2 products");

            return;

        }

        addToCompare(product);

        toast.success("Added to Compare ⚖️");

    };

    const handleBuyNow = () => {

        if (!product.url) {

            toast.error("Product link is unavailable.");

            return;

        }

        window.open(product.url, "_blank");

    };

    return (

        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

            <img
                src={product.image}
                alt={product.title}
                className="h-52 w-full object-contain bg-gray-100 p-4"
            />

            <div className="p-5">

                <h2 className="text-lg font-bold line-clamp-2">
                    {product.title}
                </h2>

                <p className="text-2xl font-bold text-green-600 mt-3">
                    ₹{product.price}
                </p>

                <p className="text-gray-600 mt-1">
                    Seller: {product.seller}
                </p>

                <p className="mt-1">
                    ⭐ {product.rating}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-5">

                    <button
                        onClick={handleWishlist}
                        className="bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition"
                    >
                        ❤️ Wishlist
                    </button>

                    <button
                        onClick={handleCompare}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
                    >
                        ⚖️ Compare
                    </button>

                </div>

                <button
                    onClick={handleBuyNow}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    🛒 Buy Now
                </button>

            </div>

        </div>

    );

}

export default ProductCard;
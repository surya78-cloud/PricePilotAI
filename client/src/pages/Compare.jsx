import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { useCompare } from "../context/compare.context";

import { compareProducts } from "../services/compare.service";

function Compare() {

    const {
        compareProducts: products,
        removeFromCompare,
        clearCompare
    } = useCompare();

    const [loading, setLoading] = useState(false);

    const [verdict, setVerdict] = useState("");

    useEffect(() => {

        if (products.length === 2) {

            getAIVerdict();

        } else {

            setVerdict("");

        }

    }, [products]);

    const getAIVerdict = async () => {

        try {

            setLoading(true);

            const res = await compareProducts(
                products[0],
                products[1]
            );

            setVerdict(res.verdict);

        } catch (error) {

            console.error(error);

            setVerdict("Failed to generate AI comparison.");

        } finally {

            setLoading(false);

        }

    };

    if (products.length === 0) {

        return (
            <>
                <Navbar />

                <div className="max-w-6xl mx-auto mt-20 text-center">

                    <h1 className="text-4xl font-bold">
                        ⚖️ Product Comparison
                    </h1>

                    <p className="mt-8 text-xl text-gray-500">
                        No products selected for comparison.
                    </p>

                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold">

                        ⚖️ Compare Products

                    </h1>

                    <button
                        onClick={clearCompare}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                        Clear All
                    </button>

                </div>

                <div
                    className={`grid gap-6 ${
                        products.length === 1
                            ? "grid-cols-1"
                            : "md:grid-cols-2"
                    }`}
                >

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow-lg p-5"
                        >

                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-60 object-contain"
                            />

                            <h2 className="text-2xl font-bold mt-5">

                                {product.title}

                            </h2>

                            <p className="text-3xl text-green-600 font-bold mt-3">

                                ₹{product.price}

                            </p>

                            <p className="mt-2">

                                ⭐ {product.rating}

                            </p>

                            <p className="mt-2">

                                Seller: {product.seller}

                            </p>

                            <a
                                href={product.url}
                                target="_blank"
                                rel="noreferrer"
                                className="block mt-5 text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                            >
                                Buy Now
                            </a>

                            <button
                                onClick={() => removeFromCompare(product.id)}
                                className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

                {products.length === 2 && (

                    <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold mb-5">

                            🤖 AI Verdict

                        </h2>

                        {loading ? (

                            <div className="text-center py-10">

                                <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600 mx-auto"></div>

                                <p className="mt-5 text-gray-600">

                                    Gemini is comparing products...

                                </p>

                            </div>

                        ) : (

                            <div className="whitespace-pre-wrap leading-8 text-lg">

                                {verdict}

                            </div>

                        )}

                    </div>

                )}

            </div>

        </>

    );

}

export default Compare;
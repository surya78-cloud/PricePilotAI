import { useState, useEffect } from "react";

import api from "../api/api";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import AIRecommendation from "../components/AIRecommendation";
import SearchHistory from "../components/SearchHistory";

import { getSearchHistory } from "../services/history.service";

function Home() {

    const [products, setProducts] = useState([]);
    const [recommendation, setRecommendation] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadHistory = async () => {
        try {
            const data = await getSearchHistory();
            setHistory(data.history);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    const searchProduct = async (query) => {

        try {

            setLoading(true);

            const res = await api.post("/search", {
                query
            });

            setProducts(res.data.products);
            setRecommendation(res.data.aiRecommendation);

            loadHistory();

        } catch (error) {

            console.error(error);

            toast.success("Search Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">

                {/* Hero Section */}

                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-16">

                    <div className="max-w-6xl mx-auto px-6 text-center">

                        <h1 className="text-5xl font-extrabold mb-4">

                            💰 PricePilot AI

                        </h1>

                        <p className="text-xl mb-8">

                            Compare prices across multiple stores and let AI help
                            you choose the best deal.

                        </p>

                        <div className="max-w-2xl mx-auto">

                            <SearchBar
                                onSearch={searchProduct}
                            />

                        </div>

                    </div>

                </div>

                {/* Main Content */}

                <div className="max-w-7xl mx-auto px-6 py-10">

                    <SearchHistory history={history} />

                    {
                        recommendation && (

                            <div className="mt-8">

                                <AIRecommendation
                                    text={recommendation}
                                />

                            </div>

                        )
                    }

                    <h2 className="text-3xl font-bold mt-10 mb-6">

                        🛍 Search Results

                    </h2>

                    {
                        loading ? (

                            <div className="text-center py-16">

                                <div className="text-2xl font-semibold">

                                    🔄 Searching Products...

                                </div>

                            </div>

                        ) : (

                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {
                                    products.map((product) => (

                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />

                                    ))
                                }

                            </div>

                        )
                    }

                    {
                        !loading && products.length === 0 && (

                            <div className="text-center mt-16 text-gray-500">

                                <h2 className="text-2xl font-semibold">

                                    Search for a product to compare prices.

                                </h2>

                            </div>

                        )
                    }

                </div>

            </div>

        </>

    );

}

export default Home;
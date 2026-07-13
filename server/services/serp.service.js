const axios = require("axios");

const searchProducts = async (query) => {

    const response = await axios.get(
        "https://serpapi.com/search.json",
        {
            params: {
                engine: "google_shopping",
                q: query,
                api_key: process.env.SERP_API_KEY,
                gl: "in",
                hl: "en"
            }
        }
    );

    const results = response.data.shopping_results || [];

    // Debug: Print first product returned by SerpAPI
    if (results.length > 0) {
        console.log("First Product:");
        console.log(results[0]);
    }

    return results.map((item, index) => ({

        id: String(item.product_id || index),

        title: item.title || "Unknown Product",

        price: Number(
            String(item.extracted_price || 0)
                .replace(/,/g, "")
        ),

        seller: item.source || "Unknown",

        rating: item.rating || 0,

        image: item.thumbnail || "",

        url:
            item.link ||
            item.product_link ||
            item.product_page_url ||
            ""

    }));

};

module.exports = {
    searchProducts
};
const { searchProductsService } = require("../services/search.service");

const searchProducts = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || query.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Search query is required."
            });
        }

        const result = await searchProductsService(
            query,
            req.user._id
        );

        res.status(200).json({
            success: true,
            count: result.products.length,
            bestDeal: result.bestDeal,
            priceDifference: result.priceDifference,
            products: result.products,
            aiRecommendation: result.recommendation
        });

    } catch (error) {

        console.error("Search Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    searchProducts
};
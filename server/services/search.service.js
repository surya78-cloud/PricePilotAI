const { searchProducts } = require("./serp.service");
const { generateRecommendation } = require("./ai.service");

const Search = require("../models/search.model");
const PriceHistory = require("../models/priceHistory.model");

const searchProductsService = async (query, userId) => {

    // Fetch products from SerpAPI
    const products = await searchProducts(query);

    if (!products.length) {

        return {
            products: [],
            bestDeal: null,
            priceDifference: 0,
            recommendation: "No products found."
        };

    }

    // Sort by lowest price
    products.sort((a, b) => a.price - b.price);

    // Best deal
    const bestDeal = products[0];

    // Highest price
    const highestPrice = products[products.length - 1].price;

    // Difference
    const priceDifference = highestPrice - bestDeal.price;

    // Save search history
    await Search.create({
        user: userId,
        query
    });

    // Save price history
    for (const product of products) {

        await PriceHistory.create({

            productId: product.id,

            title: product.title,

            seller: product.seller,

            price: product.price,

            image: product.image

        });

    }

    // Generate AI Recommendation
    const recommendation = await generateRecommendation(products);

    return {

        products,

        bestDeal,

        priceDifference,

        recommendation

    };

};

module.exports = {

    searchProductsService

};
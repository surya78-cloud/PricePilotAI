const Wishlist = require("../models/wishlist.model");

// Add to Wishlist
const addToWishlist = async (req, res) => {
    try {

        const { productId, title, price, seller, image, url } = req.body;

        const existing = await Wishlist.findOne({
            user: req.user._id,
            productId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist."
            });
        }

        const wishlistItem = await Wishlist.create({
            user: req.user._id,
            productId,
            title,
            price,
            seller,
            image,
            url
        });

        res.status(201).json({
            success: true,
            wishlistItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Wishlist
const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.find({
            user: req.user._id
        });

        res.json({
            success: true,
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Remove Wishlist Item
const removeWishlist = async (req, res) => {

    try {

        const item = await Wishlist.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!item) {

            return res.status(404).json({
                success: false,
                message: "Item not found"
            });

        }

        res.json({
            success: true,
            message: "Removed from wishlist"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addToWishlist,
    getWishlist,
    removeWishlist
};
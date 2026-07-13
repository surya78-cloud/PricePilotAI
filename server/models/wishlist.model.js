const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        productId: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        seller: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        url: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
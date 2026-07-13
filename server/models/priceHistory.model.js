const mongoose = require("mongoose");

const priceHistorySchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        seller: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        image: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "PriceHistory",
    priceHistorySchema
);
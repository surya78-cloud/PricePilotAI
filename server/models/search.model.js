const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        query: {
            type: String,
            required: true,
            trim: true,
        },

        searchedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Search", searchSchema);
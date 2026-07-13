const Search = require("../models/search.model");

const getSearchHistory = async (req, res) => {
    try {
        const history = await Search.find({
            user: req.user._id
        })
        .sort({ createdAt: -1 })
        .limit(10);

        res.status(200).json({
            success: true,
            history
        });

    } catch (error) {
        console.error("History Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch search history."
        });
    }
};

module.exports = {
    getSearchHistory
};
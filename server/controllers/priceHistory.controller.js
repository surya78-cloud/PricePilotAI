const PriceHistory = require("../models/priceHistory.model");

const getPriceHistory = async (req, res) => {

    try {

        const { productId } = req.params;

        const history = await PriceHistory.find({
            productId
        }).sort({
            createdAt: 1
        });

        res.json({
            success: true,
            history
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    getPriceHistory
};
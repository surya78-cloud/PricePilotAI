const express = require("express");

const router = express.Router();

const {
    getPriceHistory
} = require("../controllers/priceHistory.controller");

router.get("/:productId", getPriceHistory);

module.exports = router;
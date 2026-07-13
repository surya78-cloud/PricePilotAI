const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
    compareProducts
} = require("../controllers/compare.controller");

router.post("/", protect, compareProducts);

module.exports = router;
const express = require("express");
const router = express.Router();

const { searchProducts } = require("../controllers/search.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, searchProducts);

module.exports = router;
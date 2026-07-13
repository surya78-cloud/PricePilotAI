const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
    addToWishlist,
    getWishlist,
    removeWishlist
} = require("../controllers/wishlist.controller");

router.post("/", protect, addToWishlist);

router.get("/", protect, getWishlist);

router.delete("/:id", protect, removeWishlist);

module.exports = router;
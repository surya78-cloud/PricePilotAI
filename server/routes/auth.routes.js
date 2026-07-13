const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Get Current Logged-in User
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
});

module.exports = router;
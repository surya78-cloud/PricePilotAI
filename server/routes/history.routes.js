const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const { getSearchHistory } = require("../controllers/history.controller");

router.get("/", protect, getSearchHistory);

module.exports = router;
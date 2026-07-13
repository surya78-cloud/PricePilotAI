require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const searchRoutes = require("./routes/search.routes");
const historyRoutes = require("./routes/history.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const compareRoutes = require("./routes/compare.routes");
const priceHistoryRoutes = require("./routes/priceHistory.routes");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("✅ MongoDB Connected");

    })
    .catch((err) => {

        console.log(err);

    });

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/compare", compareRoutes);

// Price History Route
app.use("/api/price-history", priceHistoryRoutes);

// Health Check
app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "🚀 PricePilot AI Backend Running"
    });

});

// 404 Handler (Express 5)
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});

// Global Error Handler
app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});
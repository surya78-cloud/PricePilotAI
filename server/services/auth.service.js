const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ===================== REGISTER =====================
const registerUser = async ({ name, email, password }) => {

    if (!name || !email || !password) {
        throw new Error("All fields are required.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id);

    return {
        success: true,
        message: "User registered successfully.",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

// ===================== LOGIN =====================
const loginUser = async ({ email, password }) => {

    // Validate input
    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password.");
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return response
    return {
        success: true,
        message: "Login successful.",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};
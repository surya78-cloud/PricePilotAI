const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    register,
    login
};
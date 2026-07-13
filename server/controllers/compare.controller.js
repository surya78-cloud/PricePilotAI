const { compareService } = require("../services/compare.service");

const compareProducts = async (req, res) => {

    try {

        console.log("========== COMPARE API ==========");
        console.log(req.body);

        const { product1, product2 } = req.body;

        const verdict = await compareService(
            product1,
            product2
        );

        console.log("========== AI VERDICT ==========");
        console.log(verdict);

        res.json({
            success: true,
            verdict
        });

    } catch (error) {

        console.error("COMPARE ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    compareProducts
};
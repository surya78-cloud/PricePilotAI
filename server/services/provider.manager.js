const { searchAmazon } = require("./providers/amazon.provider");

const providers = [
    searchAmazon
];

module.exports = {
    providers
};
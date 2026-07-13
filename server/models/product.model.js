function createProduct({
    id,
    title,
    brand,
    price,
    website,
    rating,
    image,
    url
}) {
    return {
        id,
        title,
        brand,
        price,
        website,
        rating,
        image,
        url
    };
}

module.exports = {
    createProduct
};
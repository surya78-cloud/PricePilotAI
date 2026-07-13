const search = async (query) => {

    return [
        {
            id: "A101",
            title: query,
            price: 72999,
            seller: "Amazon",
            rating: 4.6,
            image: "https://dummyimage.com/300x300",
            url: "https://amazon.in"
        }
    ];

};

module.exports = {
    search
};
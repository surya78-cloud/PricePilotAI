const search = async (query) => {

    return [
        {
            id: "F101",
            title: query,
            price: 71999,
            seller: "Flipkart",
            rating: 4.5,
            image: "https://dummyimage.com/300x300",
            url: "https://flipkart.com"
        }
    ];

};

module.exports = {
    search
};
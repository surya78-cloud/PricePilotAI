import api from "../api/api";

export const addToWishlist = async (product) => {

    const response = await api.post("/wishlist", {

        productId: product.id,

        title: product.title,

        price: product.price,

        seller: product.seller,

        image: product.image,

        url: product.url

    });

    return response.data;

};

export const getWishlist = async () => {

    const response = await api.get("/wishlist");

    return response.data;

};

export const removeWishlist = async (id) => {

    const response = await api.delete(`/wishlist/${id}`);

    return response.data;

};
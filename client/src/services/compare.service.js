import api from "../api/api";

export const compareProducts = async (product1, product2) => {

    const res = await api.post("/compare", {
        product1,
        product2
    });

    return res.data;

};
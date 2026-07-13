import api from "../api/api";

export const getPriceHistory = async (productId) => {

    const res = await api.get(`/price-history/${productId}`);

    return res.data.history;

};
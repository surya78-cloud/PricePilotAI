import api from "../api/api";

export const getSearchHistory = async () => {
    const response = await api.get("/history");
    return response.data;
};
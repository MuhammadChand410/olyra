import { API_ENDPOINTS } from "../endpoint"
import api from "./axiosInstance"

export const loginUser = async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
    return response.data;
}
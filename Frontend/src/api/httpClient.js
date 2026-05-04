import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const apiError = {
            status: error.response?.status || 500,
            message:
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong !",
        };
        return Promise.reject(apiError);
    },
);
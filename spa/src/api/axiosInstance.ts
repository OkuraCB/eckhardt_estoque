import axios from "axios";

const timeout = 60 * 1000;

export const axiosInstance = axios.create({
    baseURL: `http://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_PORT}/api`,
    timeout: timeout,
});

axiosInstance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN);
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

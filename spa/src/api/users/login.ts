import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const login = async (email: string, pass: string): Promise<AxiosResponse> => {
	const req = await axiosInstance.post(`http://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_PORT}/auth/signin`, { email, password: pass });
	return req;
};

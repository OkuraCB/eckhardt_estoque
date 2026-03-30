import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const login = async (email: string, pass: string): Promise<AxiosResponse> => {
	const req = await axiosInstance.post("/auth/signin", { email, password: pass });
	return req;
};

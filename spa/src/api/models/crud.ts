import { AxiosResponse } from "axios";
import { ICreateModel } from "../../features/models/modelsSlice";
import { axiosInstance } from "../axiosInstance";

export const createModelApi = async (
	data: ICreateModel,
): Promise<AxiosResponse> => {
	const req = await axiosInstance.post(`/models`, data);

	return req;
};

export const listModelsApi = async (): Promise<AxiosResponse> => {
	const req = await axiosInstance.get(`/models`);
	return req;
};

export const deleteModelApi = async (id: number): Promise<AxiosResponse> => {
	const req = await axiosInstance.delete(`/models/${id}`);

	return req;
};

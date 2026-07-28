import { AxiosResponse } from "axios";
import { ICreateProduct } from "../../features/products/productSlice";
import { axiosInstance } from "../axiosInstance";

export const createProductApi = async (
	data: ICreateProduct,
): Promise<AxiosResponse> => {
	const { image1, image2, image3, ...sanitizedData } = data;
	const files = new FormData();

	if (data.image1) files.append("image1", data.image1);
	if (data.image2) files.append("image2", data.image2);
	if (data.image3) files.append("image3", data.image3);

	Object.entries(sanitizedData).forEach(([key, value]) => {
		files.append(key, String(value));
	});

	const req = await axiosInstance.post(`/products`, files);

	return req;
};

export const listProductsApi = async (): Promise<AxiosResponse> => {
	const req = await axiosInstance.get(`/products`);
	return req;
};

export const deleteProductApi = async (id: number): Promise<AxiosResponse> => {
	const req = await axiosInstance.delete(`/products/${id}`);

	return req;
};

import { AxiosResponse } from "axios";
import { ICreateProduct } from "../../features/products/productSlice";
import { axiosInstance } from "../axiosInstance";

export const createProductApi = async (data: ICreateProduct): Promise<AxiosResponse> => {
    const { image1, image2, image3, ...sanitizedData } = data;
    // const files = new FormData();

    const req = await axiosInstance.post(`/products`, sanitizedData);

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

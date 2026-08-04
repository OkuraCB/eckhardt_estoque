import { AxiosResponse } from "axios";
import { ICreateSale } from "../../features/sales/salesSlice";
import { axiosInstance } from "../axiosInstance";

export const createSaleApi = async (data: ICreateSale): Promise<AxiosResponse> => {
    const {productId, ...body} = data

    const req = await axiosInstance.post(`/sales/${productId}`, body);

    return req;
};

export const listSalesApi = async (): Promise<AxiosResponse> => {
    const req = await axiosInstance.get(`/sales`);
    return req;
};

export const deleteSaleApi = async (id: number): Promise<AxiosResponse> => {
    const req = await axiosInstance.delete(`/sales/${id}`);

    return req;
};

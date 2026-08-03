import { AxiosResponse } from "axios";
import { ICreateCollection } from "../../features/collections/collectionsSlice";
import { axiosInstance } from "../axiosInstance";

export const createCollectionApi = async (data: ICreateCollection): Promise<AxiosResponse> => {
    const req = await axiosInstance.post(`/collections`, data);

    return req;
};

export const listCollectionsApi = async (): Promise<AxiosResponse> => {
    const req = await axiosInstance.get(`/collections`);
    return req;
};

export const deleteCollectionApi = async (id: number): Promise<AxiosResponse> => {
    const req = await axiosInstance.delete(`/collections/${id}`);

    return req;
};

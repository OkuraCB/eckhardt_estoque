import { AxiosResponse } from "axios";
import { ICreateProduct } from "../../features/products/productSlice";
import { axiosInstance } from "../axiosInstance";

export const createProductApi = async (
  data: ICreateProduct,
): Promise<AxiosResponse> => {
  const { image1, image2, image3, ...sanitizedData } = data;

  const files = new FormData();

  if (image1) files.append("image1", image1);
  if (image2) files.append("image2", image2);
  if (image3) files.append("image3", image3);

  files.append("body", JSON.stringify(sanitizedData));

  const req = await axiosInstance.post(`/products`, files, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return req;
};

export const listProductsApi = async (): Promise<AxiosResponse> => {
  const req = await axiosInstance.get(`/products`);

  console.log(req.data);
  return req;
};

export const deleteProductApi = async (id: number): Promise<AxiosResponse> => {
  const req = await axiosInstance.delete(`/products/${id}`);

  return req;
};

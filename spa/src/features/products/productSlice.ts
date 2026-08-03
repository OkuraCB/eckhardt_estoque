import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductApi, deleteProductApi, listProductsApi } from "../../api/products/crud";
import { RootState } from "../../app/store";
import { customReject } from "../../common/customReject";
import { handleSnackbar } from "../../common/handleSnackbar";

export interface ICreateProduct {
    name: string;
    code: string | null;
    price: number;
    qty: number;
    description: string | null;
    collectionName: string | null;
    modelName: string | null;
    addonName: string | null;
    length: number | null;
    width: number | null;
    height: number | null;
    heightAddon: number | null;
    image1: File | null;
    image2: File | null;
    image3: File | null;
}

export interface IProduct {
    id: number;
    name: string;
    code: string | null;
    price: number;
    qty: number;
    description: string | null;
    collectionName: string | null;
    modelName: string | null;
    addonName: string | null;
    length: number | null;
    width: number | null;
    height: number | null;
    heightAddon: number | null;
    image1: File | null;
    image2: File | null;
    image3: File | null;
}

interface IInitial {
    products: IProduct[];
    status: string;
}

const initialState: IInitial = {
    products: [],
    status: "idle",
};

export const listProducts = createAsyncThunk("products/list", async () => {
    const res = await listProductsApi();
    return res.data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id: number, { rejectWithValue }) => {
    try {
        const res = await deleteProductApi(id);
        return res.data;
    } catch (e: any) {
        return customReject(e, rejectWithValue);
    }
});

export const createProduct = createAsyncThunk("product/create", async (data: ICreateProduct, { rejectWithValue }) => {
    try {
        console.log(data);
        const res = await createProductApi(data);
        return res.data;
    } catch (e: any) {
        return customReject(e, rejectWithValue);
    }
});

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createProduct.rejected, (state, { payload: { message } }: any) => {
                state.status = "idle";
                handleSnackbar(message, "error");
            })
            .addCase(createProduct.pending, state => {
                state.status = "pending";
            })
            .addCase(createProduct.fulfilled, (state, { payload }: any) => {
                state.status = "idle";

                state.products = [...state.products, payload.product];

                handleSnackbar("Produto criado com sucesso!", "success");
            });

        builder
            .addCase(listProducts.rejected, state => {
                state.status = "idle";
                state.products = initialState.products;
            })
            .addCase(listProducts.pending, state => {
                state.status = "pending";
            })
            .addCase(listProducts.fulfilled, (state, { payload }: any) => {
                state.status = "idle";

                state.products = payload;
            });

        builder
            .addCase(deleteProduct.rejected, (state, { payload: { message } }: any) => {
                state.status = "idle";
                handleSnackbar(message, "error");
            })
            .addCase(deleteProduct.pending, state => {
                state.status = "pending";
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }: any) => {
                state.status = "idle";

                state.products = state.products.filter(product => product.id !== payload.id);

                handleSnackbar("Produto apagado com sucesso!", "success");
            });
    },
});

export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;

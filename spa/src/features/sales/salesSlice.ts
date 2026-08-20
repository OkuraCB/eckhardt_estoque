import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createSaleApi,
  deleteSaleApi,
  listSalesApi,
} from "../../api/sales/crud";
import { RootState } from "../../app/store";
import { customReject } from "../../common/customReject";
import { handleSnackbar } from "../../common/handleSnackbar";
import { IProduct } from "../products/productSlice";

export interface ICreateSale {
  email: string;
  phone: string;
  name: string;
  productId: number;
}

export interface ISale {
  id: number;
  email: string;
  phone: string;
  name: string;
  product: IProduct;
}

interface IInitial {
  sales: ISale[];
  status: string;
}

const initialState: IInitial = {
  sales: [],
  status: "idle",
};

export const listSales = createAsyncThunk("sales/list", async () => {
  const res = await listSalesApi();

  return res.data;
});

export const deleteSale = createAsyncThunk(
  "sales/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await deleteSaleApi(id);
      return res.data;
    } catch (e: any) {
      return customReject(e, rejectWithValue);
    }
  },
);

export const createSale = createAsyncThunk(
  "sales/create",
  async (data: ICreateSale, { rejectWithValue }) => {
    try {
      const res = await createSaleApi(data);
      return res.data;
    } catch (e: any) {
      return customReject(e, rejectWithValue);
    }
  },
);

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSale.rejected, (state, { payload: { message } }: any) => {
        state.status = "idle";
        handleSnackbar(message, "error");
      })
      .addCase(createSale.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createSale.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.sales = [...state.sales, payload];

        handleSnackbar("Venda registrada com sucesso!", "success");
      });

    builder
      .addCase(listSales.rejected, (state) => {
        state.status = "idle";
        state.sales = initialState.sales;
      })
      .addCase(listSales.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listSales.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.sales = payload;
      });

    builder
      .addCase(deleteSale.rejected, (state, { payload: { message } }: any) => {
        state.status = "idle";
        handleSnackbar(message, "error");
      })
      .addCase(deleteSale.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteSale.fulfilled, (state, { payload }: any) => {
        state.status = "idle";

        state.sales = state.sales.filter((sale) => sale.id !== payload.id);

        handleSnackbar("Coleção apagado com sucesso!", "success");
      });
  },
});

export const selectSales = (state: RootState) => state.sales.sales;

export default salesSlice.reducer;

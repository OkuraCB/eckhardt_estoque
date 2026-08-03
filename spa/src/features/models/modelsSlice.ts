import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createModelApi,
	deleteModelApi,
	listModelsApi,
} from "../../api/models/crud";
import { RootState } from "../../app/store";
import { customReject } from "../../common/customReject";
import { handleSnackbar } from "../../common/handleSnackbar";

export interface ICreateModel {
	name: string;
}

export interface IModel {
	id: number;
	name: string;
}

interface IInitial {
	models: IModel[];
	status: string;
}

const initialState: IInitial = {
	models: [],
	status: "idle",
};

export const listModels = createAsyncThunk("models/list", async () => {
	const res = await listModelsApi();
	return res.data;
});

export const deleteModel = createAsyncThunk(
	"models/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const res = await deleteModelApi(id);
			return res.data;
		} catch (e: any) {
			return customReject(e, rejectWithValue);
		}
	},
);

export const createModel = createAsyncThunk(
	"models/create",
	async (data: ICreateModel, { rejectWithValue }) => {
		try {
			const res = await createModelApi(data);
			return res.data;
		} catch (e: any) {
			return customReject(e, rejectWithValue);
		}
	},
);

export const modelsSlice = createSlice({
	name: "models",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				createModel.rejected,
				(state, { payload: { message } }: any) => {
					state.status = "idle";
					handleSnackbar(message, "error");
				},
			)
			.addCase(createModel.pending, (state) => {
				state.status = "pending";
			})
			.addCase(createModel.fulfilled, (state, { payload }: any) => {
				state.status = "idle";

				state.models = [...state.models, payload.product[0]];

				handleSnackbar("Modelo criado com sucesso!", "success");
			});

		builder
			.addCase(listModels.rejected, (state) => {
				state.status = "idle";
				state.models = initialState.models;
			})
			.addCase(listModels.pending, (state) => {
				state.status = "pending";
			})
			.addCase(listModels.fulfilled, (state, { payload }: any) => {
				state.status = "idle";

				state.models = payload;
			});

		builder
			.addCase(
				deleteModel.rejected,
				(state, { payload: { message } }: any) => {
					state.status = "idle";
					handleSnackbar(message, "error");
				},
			)
			.addCase(deleteModel.pending, (state) => {
				state.status = "pending";
			})
			.addCase(deleteModel.fulfilled, (state, { payload }: any) => {
				state.status = "idle";

				state.models = state.models.filter(
					(model) => model.id !== payload.id,
				);

				handleSnackbar("Coleção apagado com sucesso!", "success");
			});
	},
});

export const selectModels = (state: RootState) => state.models.models;

export default modelsSlice.reducer;

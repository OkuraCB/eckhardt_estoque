import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createCollectionApi,
	deleteCollectionApi,
	listCollectionsApi,
} from "../../api/collections/crud";
import { RootState } from "../../app/store";
import { customReject } from "../../common/customReject";
import { handleSnackbar } from "../../common/handleSnackbar";

export interface ICreateCollection {
	name: string;
}

export interface ICollection {
	id: number;
	name: string;
}

interface IInitial {
	collections: ICollection[];
	status: string;
}

const initialState: IInitial = {
	collections: [],
	status: "idle",
};

export const listCollections = createAsyncThunk(
	"collections/list",
	async () => {
		const res = await listCollectionsApi();
		return res.data;
	},
);

export const deleteCollection = createAsyncThunk(
	"collections/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const res = await deleteCollectionApi(id);
			return res.data;
		} catch (e: any) {
			return customReject(e, rejectWithValue);
		}
	},
);

export const createColleciton = createAsyncThunk(
	"collections/create",
	async (data: ICreateCollection, { rejectWithValue }) => {
		try {
			const res = await createCollectionApi(data);
			return res.data;
		} catch (e: any) {
			return customReject(e, rejectWithValue);
		}
	},
);

export const collectionsSlice = createSlice({
	name: "collections",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				createColleciton.rejected,
				(state, { payload: { message } }: any) => {
					state.status = "idle";
					handleSnackbar(message, "error");
				},
			)
			.addCase(createColleciton.pending, (state) => {
				state.status = "pending";
			})
			.addCase(createColleciton.fulfilled, (state, { payload }: any) => {
				state.status = "idle";

				state.collections = [...state.collections, payload.product[0]];

				handleSnackbar("Coleção criada com sucesso!", "success");
			});

		builder
			.addCase(listCollections.rejected, (state) => {
				state.status = "idle";
				state.collections = initialState.collections;
			})
			.addCase(listCollections.pending, (state) => {
				state.status = "pending";
			})
			.addCase(listCollections.fulfilled, (state, { payload }: any) => {
				state.status = "idle";

				state.collections = payload;
			});

		builder
			.addCase(
				deleteCollection.rejected,
				(state, { payload: { message } }: any) => {
					state.status = "idle";
					handleSnackbar(message, "error");
				},
			)
			.addCase(deleteCollection.pending, (state) => {
				state.status = "pending";
			})
			.addCase(deleteCollection.fulfilled, (state, { payload }: any) => {
				state.status = "idle";

				state.collections = state.collections.filter(
					(collection) => collection.id !== payload.id,
				);

				handleSnackbar("Coleção apagado com sucesso!", "success");
			});
	},
});

export const selectCollections = (state: RootState) =>
	state.collections.collections;

export default collectionsSlice.reducer;

import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import collectionsReducer from "../features/collections/collectionsSlice";
import modelsReducer from "../features/models/modelsSlice";
import productsReducer from "../features/products/productSlice";
import userReducer from "../features/users/usersSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		products: productsReducer,
		collections: collectionsReducer,
		models: modelsReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

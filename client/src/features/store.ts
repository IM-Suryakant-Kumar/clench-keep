import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import api from "./api";
import { modalReducer } from "./reducers";

const store = configureStore({
	reducer: {
    modal: modalReducer,
		[api.reducerPath]: api.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export default store;

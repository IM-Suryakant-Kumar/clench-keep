import { configureStore } from "@reduxjs/toolkit";
import {
	archiveReducer,
	authReducer,
	noteReducer,
	trashReducer,
} from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import api from "./apis";

const store = configureStore({
	reducer: {
		auth: authReducer,
		note: noteReducer,
		archive: archiveReducer,
		trash: trashReducer,
		[api.reducerPath]: api.reducer,
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export default store;

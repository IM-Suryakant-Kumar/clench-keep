import { configureStore } from "@reduxjs/toolkit";
import {
	archiveReducer,
	authReducer,
	noteReducer,
	trashReducer,
} from "./reducers";

const store = configureStore({
	reducer: {
		auth: authReducer,
		note: noteReducer,
		archive: archiveReducer,
		trash: trashReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

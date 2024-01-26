import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import noteReducer from "./reducers/note";

const store = configureStore({
	reducer: {
		auth: authReducer,
		note: noteReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

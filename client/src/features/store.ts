import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import noteReducer from "./reducers/note";
import trashReducer from "./reducers/trash";
import archiveReducer from "./reducers/archive";

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

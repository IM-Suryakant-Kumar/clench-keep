import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITrash } from "../../types";
import {
	getTrashes as getTrashesApi,
	createTrash as createTrashApi,
	deleteTrash as deleteTrashApi,
} from "../../apis";

interface TrashState {
	trashes: ITrash[] | null;
	errorMessage: string | null;
	isLoading: boolean;
}

const initialState: TrashState = {
	trashes: null,
	errorMessage: null,
	isLoading: false,
};

export const getTrashes = createAsyncThunk(
	"trash/trashes",
	async (_, { rejectWithValue }) => {
		const { success, trashes, message } = await getTrashesApi();
		return success ? trashes : rejectWithValue(message);
	}
);

export const createTrash = createAsyncThunk(
	"trash/create",
	async (trash: ITrash, { rejectWithValue }) => {
		const { success, message } = await createTrashApi(trash);
		return !success && rejectWithValue(message);
	}
);

export const deleteTrash = createAsyncThunk(
	"trash/delete",
	async (noteId: string, { rejectWithValue }) => {
		const { success, message } = await deleteTrashApi(noteId);
		return !success && rejectWithValue(message);
	}
);

const trashSlice = createSlice({
	name: "trash",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getTrashes.pending, state => {
				state.isLoading = true;
        state.errorMessage = null;
			})
			.addCase(getTrashes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.trashes = action.payload;
			})
			.addCase(getTrashes.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(createTrash.pending, state => {
				state.isLoading = true;
        state.errorMessage = null;
			})
			.addCase(createTrash.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(createTrash.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(deleteTrash.pending, state => {
				state.isLoading = true;
        state.errorMessage = null;
			})
			.addCase(deleteTrash.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(deleteTrash.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			});
	},
});

export default trashSlice.reducer;

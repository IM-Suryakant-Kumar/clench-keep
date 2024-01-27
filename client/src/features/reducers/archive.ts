import IArchive from "../../types/archive";
import {
	getArchives as getArchivesApi,
	createArchive as createArchiveApi,
	deleteArchive as deleteArchiveApi,
} from "../../apis/archive";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ArchiveState {
	archives: IArchive[] | null;
	errorMessage: string | null;
	isLoading: boolean;
}

const initialState: ArchiveState = {
	archives: null,
	errorMessage: null,
	isLoading: false,
};

export const getArchives = createAsyncThunk(
	"archive/archives",
	async (_, { rejectWithValue }) => {
		const { success, archives, message } = await getArchivesApi();
		return success ? archives : rejectWithValue(message);
	}
);

export const createArchive = createAsyncThunk(
	"archive/create",
	async (archive: IArchive, { rejectWithValue }) => {
		const { success, message } = await createArchiveApi(archive);
		return !success && rejectWithValue(message);
	}
);

export const deleteArchive = createAsyncThunk(
	"archive/delete",
	async (noteId: string, { rejectWithValue }) => {
		const { success, message } = await deleteArchiveApi(noteId);
		return !success && rejectWithValue(message);
	}
);

const archiveSlice = createSlice({
	name: "archive",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getArchives.pending, state => {
				state.isLoading = true;
			})
			.addCase(getArchives.fulfilled, (state, action) => {
				state.isLoading = false;
				state.archives = action.payload;
			})
			.addCase(getArchives.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(createArchive.pending, state => {
				state.isLoading = true;
			})
			.addCase(createArchive.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(createArchive.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(deleteArchive.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteArchive.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(deleteArchive.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			});
	},
});

export default archiveSlice.reducer;

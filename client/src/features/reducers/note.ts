import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import INote from "../../types/note";
import {
	getNotes as getNotesApi,
	createNote as createNoteApi,
	updateNote as updateNoteApi,
	deletNote as deletNoteApi,
} from "../../apis/note";

interface NoteState {
	notes: INote[] | null;
	errorMessage: string | null;
	isLoading: boolean;
}

const initialState: NoteState = {
	notes: null,
	errorMessage: null,
	isLoading: false,
};

export const getNotes = createAsyncThunk(
	"note/notes",
	async (_, { rejectWithValue }) => {
		const data = await getNotesApi();
		return data.success ? data.notes : rejectWithValue(data.message);
	}
);

export const createNote = createAsyncThunk(
	"note/create",
	async (note: INote, { rejectWithValue }) => {
		const data = await createNoteApi(note);
		return !data.success && rejectWithValue(data.message);
	}
);

export const updateNote = createAsyncThunk(
	"note/update",
	async (note: INote, { rejectWithValue }) => {
		const data = await updateNoteApi(note._id, note);
		return !data.success && rejectWithValue(data.message);
	}
);

export const deleteNote = createAsyncThunk(
	"note/remove",
	async (noteId: string, { rejectWithValue }) => {
		const data = await deletNoteApi(noteId);
		return !data.success && rejectWithValue(data.message);
	}
);

const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getNotes.pending, state => {
				state.isLoading = true;
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.notes = action.payload;
			})
			.addCase(getNotes.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(createNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(createNote.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(createNote.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(updateNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateNote.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(updateNote.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(deleteNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteNote.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(deleteNote.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			});
	},
});

export default noteSlice.reducer;

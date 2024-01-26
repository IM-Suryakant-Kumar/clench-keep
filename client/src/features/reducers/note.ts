import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import INote from "../../types/note";
import { createNote, deletNote, getNotes, updateNote } from "../../apis/note";

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

export const getAllnotes = createAsyncThunk(
	"note/notes",
	async (_, { rejectWithValue }) => {
		const data = await getNotes();
		return data.success ? data.notes : rejectWithValue(data.message);
	}
);

export const AddNote = createAsyncThunk(
	"note/add",
	async (note: INote, { rejectWithValue }) => {
		const data = await createNote(note);
		return !data.success && rejectWithValue(data.message);
	}
);

export const updateSingleNote = createAsyncThunk(
	"note/update",
	async (note: INote, { rejectWithValue }) => {
		const data = await updateNote(note._id, note);
		return !data.success && rejectWithValue(data.message);
	}
);

export const removeNote = createAsyncThunk(
	"note/remove",
	async (noteId: string, { rejectWithValue }) => {
		const data = await deletNote(noteId);
		return !data.success && rejectWithValue(data.message);
	}
);

const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllnotes.pending, state => {
				state.isLoading = true;
			})
			.addCase(getAllnotes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.notes = action.payload;
			})
			.addCase(getAllnotes.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(AddNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(AddNote.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(AddNote.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(updateSingleNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(updateSingleNote.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(updateSingleNote.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(removeNote.pending, state => {
				state.isLoading = true;
			})
			.addCase(removeNote.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(removeNote.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			});
	},
});

export default noteSlice.reducer;

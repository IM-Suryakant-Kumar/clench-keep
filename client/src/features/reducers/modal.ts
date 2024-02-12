import { createSlice } from "@reduxjs/toolkit";

interface modalState {
	showCreateModal: boolean;
}

const initialState: modalState = {
	showCreateModal: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleCreateModal: state => {
			state.showCreateModal = !state.showCreateModal;
		}
	},
});

export const { toggleCreateModal } = modalSlice.actions;
export default modalSlice.reducer;

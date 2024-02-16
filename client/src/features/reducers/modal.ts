import { createSlice } from "@reduxjs/toolkit";

interface modalState {
	showCreateModal: boolean;
	showUpdateModalId: string;
}

const initialState: modalState = {
	showCreateModal: false,
	showUpdateModalId: "",
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleCreateModal: state => {
			state.showCreateModal = !state.showCreateModal;
		},
		toggleUpdateModal: (state, action) => {
      state.showUpdateModalId = action.payload;
		},
	},
});

export const { toggleCreateModal, toggleUpdateModal } = modalSlice.actions;
export default modalSlice.reducer;

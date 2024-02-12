import { createSlice } from "@reduxjs/toolkit";

interface modalState {
	showModal: boolean;
}

const initialState: modalState = {
	showModal: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: state => {
			state.showModal = true;
		},
		closeModal: state => {
			state.showModal = false;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

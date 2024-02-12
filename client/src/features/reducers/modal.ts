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
		toggleModal: state => {
			state.showModal = !state.showModal;
		}
	},
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;

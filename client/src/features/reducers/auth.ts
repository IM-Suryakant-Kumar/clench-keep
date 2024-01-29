import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types";
import {
	register as registerApi,
	login as loginApi,
	guestLogin as guestLoginApi,
	logout as logoutApi,
	getProfile as getProfileApi,
} from "../../apis";

interface AuthState {
	user: IUser | null;
	errorMessage: string | null;
	isSubmitting: boolean;
	isLoading: boolean;
	isProfileLoading: boolean;
}

const initialState: AuthState = {
	user: null,
	errorMessage: null,
	isSubmitting: false,
	isLoading: false,
	isProfileLoading: false,
};

export const register = createAsyncThunk(
	"auth/register",
	async (cred: IUser, { rejectWithValue }) => {
		const { success, user, message } = await registerApi(cred);
		return success ? user : rejectWithValue(message);
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (cred: IUser, { rejectWithValue }) => {
		const { success, user, message } = await loginApi(cred);
		return success ? user : rejectWithValue(message);
	}
);

export const guestLogin = createAsyncThunk(
	"auth/guest",
	async (_, { rejectWithValue }) => {
		const { success, user, message } = await guestLoginApi();
		return success ? user : rejectWithValue(message);
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		const { success, user, message } = await logoutApi();
		return success ? user : rejectWithValue(message);
	}
);

export const getProfile = createAsyncThunk(
	"auth/profile",
	async (_, { rejectWithValue }) => {
		const { success, user, message } = await getProfileApi();
		return success ? user : rejectWithValue(message);
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isSubmitting = true;
			})
			.addCase(register.fulfilled, state => {
				state.isSubmitting = false;
				state.errorMessage = null;
				// state.user =
			})
			.addCase(register.rejected, (state, action) => {
				state.isSubmitting = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(login.pending, state => {
				state.isSubmitting = true;
			})
			.addCase(login.fulfilled, state => {
				state.isSubmitting = false;
				state.errorMessage = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.isSubmitting = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(guestLogin.pending, state => {
				state.isLoading = true;
			})
			.addCase(guestLogin.fulfilled, state => {
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(guestLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(logout.pending, state => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, state => {
				state.isLoading = false;
				state.errorMessage = null;
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(getProfile.pending, state => {
				state.isProfileLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isProfileLoading = false;
				state.user = action.payload;
				state.errorMessage = null;
			})
			.addCase(getProfile.rejected, state => {
				state.isProfileLoading = false;
			});
	},
});

export default authSlice.reducer;

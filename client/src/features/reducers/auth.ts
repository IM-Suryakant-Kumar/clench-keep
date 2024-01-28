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
	isLoading: boolean;
}

const initialState: AuthState = {
	user: null,
	errorMessage: null,
	isLoading: false,
};

export const register = createAsyncThunk(
	"auth/register",
	async (user: IUser, { rejectWithValue }) => {
		const { success, message } = await registerApi(user);
		return !success && rejectWithValue(message);
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (user: IUser, { rejectWithValue }) => {
		const { success, message } = await loginApi(user);
		return !success && rejectWithValue(message);
	}
);

export const guestLogin = createAsyncThunk(
	"auth/guest",
	async (_, { rejectWithValue }) => {
		const { success, message } = await guestLoginApi();
		return !success && rejectWithValue(message);
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		const { success, message } = await logoutApi();
		return !success && rejectWithValue(message);
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
				state.isLoading = true;
			})
			.addCase(register.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(login.pending, state => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(guestLogin.pending, state => {
				state.isLoading = true;
			})
			.addCase(guestLogin.fulfilled, state => {
				state.isLoading = false;
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
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(getProfile.pending, state => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false;
        state.user = action.payload
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
	},
});

export default authSlice.reducer;

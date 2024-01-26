import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import {
	getProfile,
	guestLogin,
	login,
	logout,
	register,
} from "../../apis/auth";

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

export const registerUser = createAsyncThunk(
	"auth/register",
	async (user: IUser, { rejectWithValue }) => {
		const data = await register(user);
		return data.success ? data.message : rejectWithValue(data.message);
	}
);

export const loginUser = createAsyncThunk(
	"auth/login",
	async (user: IUser, { rejectWithValue }) => {
		const data = await login(user);
		return data.success ? data.message : rejectWithValue(data.message);
	}
);

export const guestUserLogin = createAsyncThunk(
	"auth/guest",
	async (_, { rejectWithValue }) => {
		const data = await guestLogin();
		return data.success ? data.message : rejectWithValue(data.message);
	}
);

export const logoutUser = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		const data = await logout();
		return data.success ? data.message : rejectWithValue(data.message);
	}
);

export const getUserProfile = createAsyncThunk(
	"auth/profile",
	async (_, { rejectWithValue }) => {
		const data = await getProfile();
		return data.success ? data.user : rejectWithValue(data.message);
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(loginUser.pending, state => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(guestUserLogin.pending, state => {
				state.isLoading = true;
			})
			.addCase(guestUserLogin.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(guestUserLogin.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(logoutUser.pending, state => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, state => {
				state.isLoading = false;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
			.addCase(getUserProfile.pending, state => {
				state.isLoading = true;
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
        state.user = action.payload
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.errorMessage = action.payload as string;
			})
	},
});

export default authSlice.reducer;

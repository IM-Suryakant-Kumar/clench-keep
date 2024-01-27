import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import {
  register as registerApi,
	login as loginApi,
	guestLogin as guestLoginApi,
	logout as logoutApi,
	getProfile as getProfileApi,
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

export const register = createAsyncThunk(
	"auth/register",
	async (user: IUser, { rejectWithValue }) => {
		const data = await registerApi(user);
		return !data.success && rejectWithValue(data.message);
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (user: IUser, { rejectWithValue }) => {
		const data = await loginApi(user);
		return !data.success && rejectWithValue(data.message);
	}
);

export const guestLogin = createAsyncThunk(
	"auth/guest",
	async (_, { rejectWithValue }) => {
		const data = await guestLoginApi();
		return !data.success && rejectWithValue(data.message);
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		const data = await logoutApi();
		return !data.success && rejectWithValue(data.message);
	}
);

export const getProfile = createAsyncThunk(
	"auth/profile",
	async (_, { rejectWithValue }) => {
		const data = await getProfileApi();
		return data.success ? data.user : rejectWithValue(data.message);
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

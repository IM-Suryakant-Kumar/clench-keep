import { toast } from "react-toastify";
import { IUser, SuccessResponse } from "../../types";
import api from "../api";
import {
	addTokenToLocalStorage,
	getTokenFromLocalStorage,
	removeTokenFromLocalStorage,
} from "../../utils";

const auth = api.injectEndpoints({
	endpoints: build => ({
		getProfile: build.query<SuccessResponse, void>({
			query: () => ({
				url: "/auth/me",
				method: "GET",
				headers: {
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			providesTags: result =>
				result ? [{ type: "auth", id: "LIST" }] : ["auth"],
		}),
		register: build.mutation<SuccessResponse, IUser>({
			query: user => ({
				url: "/auth/register",
				method: "POST",
				body: user,
			}),
			invalidatesTags: result => {
				if (result) {
					addTokenToLocalStorage(result.token);
					toast.success(result.message);
				}
				return result ? ["auth"] : [{ type: "auth", id: "LIST" }];
			},
		}),
		login: build.mutation<SuccessResponse, IUser>({
			query: (user: IUser) => ({
				url: "/auth/login",
				method: "POST",
				body: user,
			}),
			invalidatesTags: result => {
				if (result) {
					addTokenToLocalStorage(result.token);
					toast.success(result.message);
				}
				return result ? ["auth"] : [{ type: "auth", id: "ERROR" }];
			},
		}),
		guestLogin: build.mutation<SuccessResponse, void>({
			query: () => "/auth/login",
			invalidatesTags: result => {
				if (result) {
					addTokenToLocalStorage(result.token);
					toast.success(result.message);
				}
				return result ? ["auth"] : [{ type: "auth", id: "ERROR" }];
			},
		}),
		logout: build.mutation<SuccessResponse, void>({
			query: () => ({
				url: "/auth/logout",
				method: "GET",
				headers: {
					Authorization: `Bearer ${getTokenFromLocalStorage()}`,
				},
			}),
			invalidatesTags: result => {
				if (result) {
					removeTokenFromLocalStorage();
					toast.success(result.message);
				}
				return result ?  [{ type: "auth", id: "LIST" }] : [{ type: "auth", id: "ERROR" }];
			},
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetProfileQuery,
	useRegisterMutation,
	useLoginMutation,
	useGuestLoginMutation,
	useLogoutMutation,
} = auth;

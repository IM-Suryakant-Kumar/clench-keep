import { IUser, Response } from "../../types";
import api from "../api";

const auth = api.injectEndpoints({
	endpoints: build => ({
		getProfile: build.query<Response, null>({
			query: () => "/auth/me",
			providesTags: result =>
				result ? [{ type: "auth", _id: result.user._id }] : ["auth"],
		}),
		register: build.mutation<Response, IUser>({
			query: user => ({
				url: "/auth/register",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["auth"],
		}),
		login: build.mutation<Response, IUser>({
			query: (user: IUser) => ({
				url: "/auth/login",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["auth"],
		}),
		guestLogin: build.mutation<Response, null>({
			query: () => "/auth/login",
			invalidatesTags: ["auth"],
		}),
		logout: build.mutation<Response, null>({
			query: () => "/auth/logout",
			invalidatesTags: ["auth"],
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

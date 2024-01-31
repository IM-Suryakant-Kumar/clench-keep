import { IUser, Response } from "../../types";
import api from "../apis";

const auth = api.injectEndpoints({
	endpoints: build => ({
		getProfile: build.query<Response, null>({
			query: () => "/auth/me",
			providesTags: [{ type: "auth", id: "LIST" }],
		}),
		login: build.mutation<Response, IUser>({
			query: (user: IUser) => ({
				url: "/auth/login",
				method: "POST",
				body: user,
			}),
			invalidatesTags: [{ type: "auth", id: "LIST" }],
		}),
		guestLogin: build.mutation<Response, null>({
			query: () => "/auth/login",
			invalidatesTags: [{ type: "auth", id: "LIST" }],
		}),
	}),
	overrideExisting: false,
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = auth;

import { INote, Response } from "../../types";
import { getTokenFromLocalStorage } from "../../utils";
import api from "../api";

const note = api.injectEndpoints({
	endpoints: build => ({
		getNotes: build.query<Response, void>({
			query: () => ({
				url: "/note",
				method: "GET",
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			providesTags: result =>
				result ? [{ type: "note", id: "LIST" }] : ["note"],
		}),
		createNote: build.mutation<Response, INote>({
			query: body => ({
				url: "/note",
				method: "POST",
				body,
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			invalidatesTags: result =>
				result ? ["note"] : [{ type: "note", id: "ERROR" }],
		}),
		updateNote: build.mutation<Response, INote>({
			query: body => ({
				url: `/note/${body._id}`,
				method: "PATCH",
				body,
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			invalidatesTags: result =>
				result
					? [{ type: "note", id: "LIST" }]
					: [{ type: "note", id: "ERROR" }],
		}),
		deleteNote: build.mutation<Response, INote>({
			query: ({ _id }) => ({
				url: `/note/${_id}`,
				method: "DELETE",
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			invalidatesTags: result =>
				result
					? [{ type: "note", id: "LIST" }]
					: [{ type: "note", id: "ERROR" }],
		}),
	}),
});

export const {
	useGetNotesQuery,
	useCreateNoteMutation,
	useUpdateNoteMutation,
	useDeleteNoteMutation,
} = note;

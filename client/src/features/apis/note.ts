/* eslint-disable no-mixed-spaces-and-tabs */
import { toast } from "react-toastify";
import { ErrorResponse, INote, Response } from "../../types";
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
				result
					? [
							...result.notes.map(({ _id }) => ({
								type: "note" as const,
								id: _id,
							})),
							{ type: "note", id: "LIST" },
					  ]
					: [{ type: "note", id: "LIST" }],
		}),
		createNote: build.mutation<Response, INote>({
			query: body => ({
				url: "/note",
				method: "POST",
				body,
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			invalidatesTags: (result, error) => {
				if (result) {
					toast.success(result.message);
				} else {
					const errorMessage = (error as ErrorResponse).data.message;
					toast.error(errorMessage);
				}
				return [{ type: "note", id: "LIST" }];
			},
		}),
		updateNote: build.mutation<Response, INote>({
			query: body => ({
				url: `/note/${body._id}`,
				method: "PATCH",
				body,
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			invalidatesTags: (result, error, arg) => {
				if (result) {
					toast.success(result.message);
				} else {
					const errorMessage = (error as ErrorResponse).data.message;
					toast.error(errorMessage);
				}
				return [{ type: "note", id: arg._id }];
			},
		}),
		deleteNote: build.mutation<Response, INote>({
			query: ({ _id }) => ({
				url: `/note/${_id}`,
				method: "DELETE",
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			invalidatesTags: (result, error, arg) => {
				if (result) {
					toast.success(result.message);
				} else {
					const errorMessage = (error as ErrorResponse).data.message;
					toast.error(errorMessage);
				}
				return [{ type: "note", id: arg._id }];
			},
		}),
	}),
});

export const {
	useGetNotesQuery,
	useCreateNoteMutation,
	useUpdateNoteMutation,
	useDeleteNoteMutation,
} = note;

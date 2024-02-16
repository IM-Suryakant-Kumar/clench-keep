import { toast } from "react-toastify";
import { ErrorResponse, INote, SuccessResponse } from "../../types";
import { getTokenFromLocalStorage } from "../../utils";
import api from "../api";

const note = api.injectEndpoints({
	endpoints: build => ({
		getNotes: build.query<SuccessResponse, void>({
			query: () => ({
				url: "/note",
				method: "GET",
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			providesTags: result =>
				result ? [{ type: "note", id: "LIST" }] : ["note"],
		}),
		createNote: build.mutation<SuccessResponse, INote>({
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
				return result ? ["note"] : [{ type: "note", id: "ERROR" }];
			},
		}),
		updateNote: build.mutation<SuccessResponse, INote>({
			query: body => ({
				url: `/note/${body._id}`,
				method: "PATCH",
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
				return result
					? [{ type: "note", id: "LIST" }]
					: [{ type: "note", id: "ERROR" }];
			},
		}),
		deleteNote: build.mutation<SuccessResponse, INote>({
			query: ({ _id }) => ({
				url: `/note/${_id}`,
				method: "DELETE",
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			invalidatesTags: (result, error) => {
				if (result) {
					toast.success(result.message);
				} else {
					const errorMessage = (error as ErrorResponse).data.message;
					toast.error(errorMessage);
				}
				return result
					? [{ type: "note", id: "LIST" }]
					: [{ type: "note", id: "ERROR" }]
      }
		}),
	}),
});

export const {
	useGetNotesQuery,
	useCreateNoteMutation,
	useUpdateNoteMutation,
	useDeleteNoteMutation,
} = note;

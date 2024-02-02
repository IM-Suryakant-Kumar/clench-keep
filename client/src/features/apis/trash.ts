import { toast } from "react-toastify";
import { ErrorResponse, ITrash, Response } from "../../types";
import { getTokenFromLocalStorage } from "../../utils";
import api from "../api";

const trash = api.injectEndpoints({
	endpoints: build => ({
		getTrashes: build.query<Response, void>({
			query: () => ({
				url: "/trash",
				method: "GET",
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			providesTags: result =>
				result ? [{ type: "trash", id: "LIST" }] : ["trash"],
		}),
		createTrash: build.mutation<Response, ITrash>({
			query: body => ({
				url: "/archive",
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
				return result ? ["trash"] : [{ type: "trash", id: "ERROR" }];
			},
		}),
		updateTrash: build.mutation<Response, ITrash>({
			query: body => ({
				url: `/trash/${body.noteId}`,
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
					? [{ type: "trash", id: "LIST" }]
					: [{ type: "trash", id: "ERROR" }];
			},
		}),
		deleteTrash: build.mutation<Response, ITrash>({
			query: body => ({
				url: `/trash/${body.noteId}`,
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
					? [{ type: "trash", id: "LIST" }]
					: [{ type: "trash", id: "ERROR" }];
			},
		}),
	}),
});

export const {
	useGetTrashesQuery,
	useCreateTrashMutation,
	useUpdateTrashMutation,
	useDeleteTrashMutation,
} = trash;

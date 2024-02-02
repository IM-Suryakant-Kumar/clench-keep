import { toast } from "react-toastify";
import { ErrorResponse, IArchive, Response } from "../../types";
import { getTokenFromLocalStorage } from "../../utils";
import api from "../api";

const archive = api.injectEndpoints({
	endpoints: build => ({
		getArchives: build.query<Response, void>({
			query: () => ({
				url: "/archive",
				method: "GET",
				headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
			}),
			providesTags: result =>
				result ? [{ type: "archive", id: "LIST" }] : ["archive"],
		}),
		createArchive: build.mutation<Response, IArchive>({
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
				return result ? ["archive"] : [{ type: "archive", id: "ERROR" }];
			},
		}),
		updateArchive: build.mutation<Response, IArchive>({
			query: body => ({
				url: `/archive/${body.noteId}`,
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
					? [{ type: "archive", id: "LIST" }]
					: [{ type: "archive", id: "ERROR" }];
			},
		}),
		deleteArchive: build.mutation<Response, IArchive>({
			query: body => ({
				url: `/archive/${body.noteId}`,
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
					? [{ type: "archive", id: "LIST" }]
					: [{ type: "archive", id: "ERROR" }];
			},
		}),
	}),
});

export const {
	useGetArchivesQuery,
	useCreateArchiveMutation,
	useUpdateArchiveMutation,
	useDeleteArchiveMutation,
} = archive;

import { toast } from "react-toastify";
import { ErrorResponse, INote, SuccessResponse } from "../../types";
import { getTokenFromLocalStorage } from "../../utils";
import api from "../api";

const trash = api.injectEndpoints({
	endpoints: build => ({
		createTrash: build.mutation<SuccessResponse, INote>({
			query: body => ({
				url: `/trash/create/${body._id}`,
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
		deleteTrash: build.mutation<SuccessResponse, INote>({
			query: body => ({
				url: `/trash/delete/${body._id}`,
				method: "PATCH",
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
	}),
});

export const {
	useCreateTrashMutation,
	useDeleteTrashMutation,
} = trash;

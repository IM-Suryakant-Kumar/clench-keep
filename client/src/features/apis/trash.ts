import { toast } from "react-toastify";
import { ErrorResponse, INote, SuccessResponse } from "../../types";
import { getTokenFromLocalStorage } from "../../utils";
import api from "../api";

const trash = api.injectEndpoints({
	endpoints: build => ({
		AddToTrash: build.mutation<SuccessResponse, INote>({
			query: body => ({
				url: `/trash/add/${body._id}`,
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
		restoreFromTrash: build.mutation<SuccessResponse, INote>({
			query: body => ({
				url: `/trash/restore/${body._id}`,
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

export const { useAddToTrashMutation, useRestoreFromTrashMutation } = trash;

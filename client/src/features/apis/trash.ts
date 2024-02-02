import { ITrash, Response } from "../../types";
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
    createTrash: build.mutation<Response, ITrash>({}),
    updateTrash: build.mutation<Response, ITrash>({}),
    deleteTrash: build.mutation<Response, ITrash>({})
	}),
});

export const {} = trash;

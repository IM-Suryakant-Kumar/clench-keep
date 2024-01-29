import { axios } from ".";
import { toast } from "react-toastify";
import { IApiRes, ITrash } from "../types";
import { asyncWrapper, getTokenFromLocalStorage } from "../utils";

export const getTrashes = () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/trash", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const createTrash = (trash: ITrash) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/trash", trash, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

export const getTrash = (noteId: string) =>
	asyncWrapper(async () => {
		const { data } = (await axios.get(`/trash/${noteId}`, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const updateTrash = (noteId: string, trash: ITrash) =>
	asyncWrapper(async () => {
		const { data } = (await axios.patch(`/trash/${noteId}`, trash, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

export const deleteTrash = (noteId: string) =>
	asyncWrapper(async () => {
		const { data } = (await axios.delete(`/trash/${noteId}`, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

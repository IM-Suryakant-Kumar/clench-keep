import { toast } from "react-toastify";
import IApiRes from "../types/response";
import asyncWrapper from "../utils/asyncWrapper";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import axios from "./axios";
import INote from "../types/note";

export const getNotes = () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/note", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const createNote = (note: INote) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/note", note, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

export const getNote = (noteId: string) =>
	asyncWrapper(async () => {
		const { data } = (await axios.get(`/note/${noteId}`, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

export const updateNote = (noteId: string, note: INote) =>
	asyncWrapper(async () => {
		const { data } = (await axios.patch(`/note/${noteId}`, note, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

export const deletNote = (noteId: string) =>
	asyncWrapper(async () => {
		const { data } = (await axios.delete(`/note/${noteId}`, {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		toast.success(data.message);
		return data;
	});

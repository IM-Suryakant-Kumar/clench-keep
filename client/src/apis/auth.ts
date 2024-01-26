import { toast } from "react-toastify";
import IApiRes from "../types/response";
import { IUser } from "../types/user";
import asyncWrapper from "../utils/asyncWrapper";
import {
	addTokenToLocalStorage,
	getTokenFromLocalStorage,
	removeTokenFromLocalStorage,
} from "../utils/handleToken";
import axios from "./axios";

export const register = (user: IUser) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/auth/resister", user)) as IApiRes;
		addTokenToLocalStorage(data.token);
		toast.success(data.message);
		return data;
	});

export const login = (user: IUser) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/auth/login", user)) as IApiRes;
		addTokenToLocalStorage(data.token);
		toast.success(data.message);
		return data;
	});

export const guestLogin = () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/auth/login")) as IApiRes;
		addTokenToLocalStorage(data.token);
		toast.success(data.message);
		return data;
	});

export const logout = () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/auth/logout", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		removeTokenFromLocalStorage();
		toast.success(data.message);
		return data;
	});

export const getProfile = () =>
	asyncWrapper(async () => {
		const { data } = (await axios.get("/auth/me", {
			headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
		})) as IApiRes;
		return data;
	});

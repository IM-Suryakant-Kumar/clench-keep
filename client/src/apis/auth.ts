import { axios } from ".";
import { toast } from "react-toastify";
import { IApiRes, IUser } from "../types";
import {
	addTokenToLocalStorage,
	asyncWrapper,
	getTokenFromLocalStorage,
	removeTokenFromLocalStorage,
} from "../utils";

export const register = (user: IUser) =>
	asyncWrapper(async () => {
		const { data } = (await axios.post("/auth/register", user)) as IApiRes;
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

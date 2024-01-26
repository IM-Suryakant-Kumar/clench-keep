import axios from "axios";

const baseURL: string = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
	baseURL,
	withCredentials: true,
});

export default instance;

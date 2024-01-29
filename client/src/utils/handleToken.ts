export const addTokenToLocalStorage = (token: string) => {
	localStorage.setItem("token", JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
	localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("token") as string);
};

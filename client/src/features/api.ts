import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: "include",
	}),
	tagTypes: ["auth", "note", "archive", "trash"],
	endpoints: () => ({}),
});

export default api;

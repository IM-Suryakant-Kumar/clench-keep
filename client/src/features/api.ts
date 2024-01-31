import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../utils";

const api = createApi({
  reducerPath: "api",
	baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
		headers: {
      "Content-Type": "application/json",
			Authorization: `Bearer ${getTokenFromLocalStorage()}`,
		},
	}),
	tagTypes: ["auth", "note", "archive", "trash"],
	endpoints: () => ({}),
});

export default api;